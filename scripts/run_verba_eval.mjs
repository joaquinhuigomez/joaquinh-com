import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getOpenAiConfig } from "../functions/api/_shared.js";
import { createDraft, createPrompt } from "../functions/api/text-service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const args = parseArgs(process.argv.slice(2));
const datasetPath = path.resolve(repoRoot, args.dataset || "evals/verba-benchmark.sample.json");
const envPath = path.resolve(repoRoot, args.env || ".dev.vars");
const envValues = await loadEnvFile(envPath);
const config = getOpenAiConfig({ ...process.env, ...envValues });
const providerSpecs = parseProviders(args.providers, config);
const dataset = JSON.parse(await fs.readFile(datasetPath, "utf8"));
const cases = Array.isArray(dataset) ? dataset : dataset.cases;

if (!Array.isArray(cases) || !cases.length) {
  throw new Error("Dataset must contain a non-empty array of cases.");
}

const startedAt = new Date();
const results = [];

for (const providerSpec of providerSpecs) {
  for (const testCase of cases) {
    const baseInput = {
      provider: providerSpec.provider,
      model: providerSpec.model,
      sourceLanguage: testCase.sourceLanguage,
      outputLanguage: testCase.outputLanguage || testCase.sourceLanguage,
      register: testCase.register || "Clear Note",
      tone: testCase.tone || "Neutral",
      transcript: testCase.rawTranscript,
      correctedTranscript: testCase.correctedTranscript || testCase.rawTranscript,
      flags: Array.isArray(testCase.flags) ? testCase.flags : [],
      config
    };

    try {
      const response =
        (testCase.mode || "draft") === "prompt" ? await createPrompt(baseInput) : await createDraft(baseInput);

      results.push({
        caseId: testCase.id,
        label: testCase.label || testCase.id,
        provider: providerSpec.provider,
        model: response.model?.model || providerSpec.model || "",
        mode: testCase.mode || "draft",
        success: true,
        sourceLanguage: baseInput.sourceLanguage,
        outputLanguage: baseInput.outputLanguage,
        register: baseInput.register,
        tone: baseInput.tone,
        output: response.output,
        notes: response.notes || [],
        warnings: response.warnings || [],
        trace: response.trace || null,
        expectedChecks: testCase.expectedChecks || [],
        evaluatedChecks: evaluateChecks(response, testCase)
      });
    } catch (error) {
      results.push({
        caseId: testCase.id,
        label: testCase.label || testCase.id,
        provider: providerSpec.provider,
        model: providerSpec.model || "",
        mode: testCase.mode || "draft",
        success: false,
        sourceLanguage: baseInput.sourceLanguage,
        outputLanguage: baseInput.outputLanguage,
        register: baseInput.register,
        tone: baseInput.tone,
        error: error instanceof Error ? error.message : String(error),
        expectedChecks: testCase.expectedChecks || [],
        evaluatedChecks: evaluateChecks(null, testCase, error instanceof Error ? error.message : String(error))
      });
    }
  }
}

const summary = summarizeResults(results);
const supportScorecard = buildSupportScorecard(results);
const report = {
  generatedAt: startedAt.toISOString(),
  dataset: path.relative(repoRoot, datasetPath),
  providerSpecs,
  caseCount: cases.length,
  summary,
  supportScorecard,
  results
};

const reportsDir = path.resolve(repoRoot, "evals/reports");
await fs.mkdir(reportsDir, { recursive: true });
const stamp = startedAt.toISOString().replace(/[:.]/g, "-");
const baseName = `verba-eval-${stamp}`;
const jsonPath = path.join(reportsDir, `${baseName}.json`);
const markdownPath = path.join(reportsDir, `${baseName}.md`);

await fs.writeFile(jsonPath, JSON.stringify(report, null, 2));
await fs.writeFile(markdownPath, renderMarkdownReport(report));

if (args["publish-scorecard"]) {
  const publishPath = path.resolve(repoRoot, args["publish-scorecard"]);
  await fs.mkdir(path.dirname(publishPath), { recursive: true });
  await fs.writeFile(
    publishPath,
    JSON.stringify(
      {
        generatedAt: report.generatedAt,
        dataset: report.dataset,
        supportScorecard: report.supportScorecard
      },
      null,
      2
    )
  );
  console.log(`Saved support scorecard to ${publishPath}`);
}

if (args["publish-report"]) {
  const publishReportPath = path.resolve(repoRoot, args["publish-report"]);
  await fs.mkdir(path.dirname(publishReportPath), { recursive: true });
  await fs.writeFile(publishReportPath, renderMarkdownReport(report));
  console.log(`Saved public benchmark report to ${publishReportPath}`);
}

console.log(`Saved JSON report to ${jsonPath}`);
console.log(`Saved Markdown report to ${markdownPath}`);

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const value = argv[index + 1] && !argv[index + 1].startsWith("--") ? argv[index + 1] : "true";
    parsed[key] = value;

    if (value !== "true") {
      index += 1;
    }
  }

  return parsed;
}

async function loadEnvFile(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .reduce((env, line) => {
        const separatorIndex = line.indexOf("=");
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        env[key] = value;
        return env;
      }, {});
  } catch {
    return {};
  }
}

function parseProviders(rawProviders, config) {
  const defaultProvider = config.textProvider || "local";
  const defaultModel = resolveDefaultModel(defaultProvider, config);
  const source = rawProviders || `${defaultProvider}=${defaultModel}`;

  return source
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [provider, ...modelParts] = part.split("=");
      return {
        provider: provider.trim(),
        model: modelParts.join("=").trim() || resolveDefaultModel(provider.trim(), config)
      };
    });
}

function resolveDefaultModel(provider, config) {
  if (provider === "openai") {
    return config.textModel;
  }

  if (provider === "anthropic") {
    return config.anthropicTextModel;
  }

  if (provider === "local") {
    return config.localTextModel;
  }

  return "";
}

function summarizeResults(results) {
  const grouped = new Map();

  for (const result of results) {
    const key = `${result.provider}:${result.model}`;
    const current = grouped.get(key) || {
      provider: result.provider,
      model: result.model,
      total: 0,
      success: 0,
      failures: 0,
      totalLatencyMs: 0,
      totalEstimatedCostUsd: 0
    };

    current.total += 1;
    if (result.success) {
      current.success += 1;
      current.totalLatencyMs += Number(result.trace?.latencyMs || 0);
      current.totalEstimatedCostUsd += Number(result.trace?.usageEstimate?.estimatedCostUsd || 0);
    } else {
      current.failures += 1;
    }

    grouped.set(key, current);
  }

  return [...grouped.values()].map((entry) => ({
    ...entry,
    averageLatencyMs: entry.success ? Math.round(entry.totalLatencyMs / entry.success) : null,
    totalEstimatedCostUsd: Number(entry.totalEstimatedCostUsd.toFixed(4)),
    passedChecks: results
      .filter((result) => `${result.provider}:${result.model}` === `${entry.provider}:${entry.model}`)
      .reduce((total, result) => total + result.evaluatedChecks.filter((check) => check.status === "pass").length, 0),
    totalChecks: results
      .filter((result) => `${result.provider}:${result.model}` === `${entry.provider}:${entry.model}`)
      .reduce((total, result) => total + result.evaluatedChecks.length, 0)
  }));
}

function buildSupportScorecard(results) {
  const grouped = new Map();

  for (const result of results) {
    const language = result.sourceLanguage || "Unknown";
    const entry = grouped.get(language) || {
      language,
      totalCases: 0,
      successfulCases: 0,
      passedChecks: 0,
      totalChecks: 0
    };

    entry.totalCases += 1;
    if (result.success) {
      entry.successfulCases += 1;
    }

    entry.passedChecks += result.evaluatedChecks.filter((check) => check.status === "pass").length;
    entry.totalChecks += result.evaluatedChecks.filter((check) => check.status !== "manual").length;
    grouped.set(language, entry);
  }

  return [...grouped.values()].map((entry) => {
    const passRate = entry.totalChecks ? entry.passedChecks / entry.totalChecks : 0;
    return {
      language: entry.language,
      totalCases: entry.totalCases,
      successfulCases: entry.successfulCases,
      passRate: Number(passRate.toFixed(2)),
      rating: passRate >= 0.85 ? "stable" : passRate >= 0.6 ? "review" : "lab"
    };
  });
}

function evaluateChecks(response, testCase, errorMessage = "") {
  const expectedChecks = Array.isArray(testCase.expectedChecks) ? testCase.expectedChecks : [];
  const output = response?.output || "";
  const warnings = Array.isArray(response?.warnings) ? response.warnings : [];

  return expectedChecks.map((check) => ({
    check,
    status: evaluateCheckStatus(check, { output, warnings, testCase, errorMessage }),
    note: buildCheckNote(check, { output, warnings, errorMessage })
  }));
}

function evaluateCheckStatus(check, context) {
  if (context.errorMessage) {
    return "fail";
  }

  switch (check) {
    case "traditional-script-preserved":
      return containsTraditionalScript(context.output) ? "pass" : "fail";
    case "same-language-rewrite":
      return normalizeSpaces(context.output) !== normalizeSpaces(context.testCase.correctedTranscript || context.testCase.rawTranscript) ? "pass" : "fail";
    case "spanish-output":
      return isLikelyLanguage(context.output, "spanish") ? "pass" : "fail";
    case "no-chinese-leftover":
      return /[\p{Script=Han}]/u.test(context.output) ? "fail" : "pass";
    case "english-output":
    case "english-prompt":
      return isLikelyLanguage(context.output, "english") ? "pass" : "fail";
    case "actionable":
      return /(task|build|create|write|generate|deliver|implement|prompt)/i.test(context.output) ? "pass" : "fail";
    case "code-switch-handled":
      return context.output.length > 20 ? "pass" : "fail";
    case "policy-behavior-visible":
      return context.output.length || context.warnings.length ? "pass" : "manual";
    case "meaning-preserved":
    case "no-random-hallucination":
      return "manual";
    default:
      return context.output ? "pass" : "manual";
  }
}

function buildCheckNote(check, context) {
  if (context.errorMessage) {
    return context.errorMessage;
  }

  if (check === "meaning-preserved" || check === "no-random-hallucination") {
    return "Manual review recommended for semantic fidelity.";
  }

  return "";
}

function containsTraditionalScript(text) {
  return /[體這說還沒國關]/u.test(text) && !/[体这说还没国关]/u.test(text);
}

function isLikelyLanguage(text, language) {
  const normalized = normalizeSpaces(text).toLowerCase();

  if (!normalized) {
    return false;
  }

  if (language === "spanish") {
    return /( el | la | que | de | y | para | estoy | tengo | equipo )/i.test(` ${normalized} `) && !/[\p{Script=Han}]/u.test(normalized);
  }

  if (language === "english") {
    return /( the | and | to | for | build | create | prompt | team | feature )/i.test(` ${normalized} `) && !/[\p{Script=Han}]/u.test(normalized);
  }

  return true;
}

function normalizeSpaces(value = "") {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function renderMarkdownReport(report) {
  const lines = [
    "# Verba Eval Report",
    "",
    `- Generated: ${report.generatedAt}`,
    `- Dataset: ${report.dataset}`,
    `- Cases: ${report.caseCount}`,
    ""
  ];

  lines.push("## Summary", "");

  for (const item of report.summary) {
    lines.push(
      `- ${item.provider} / ${item.model}: ${item.success}/${item.total} successful, avg latency ${item.averageLatencyMs ?? "n/a"} ms, est. cost $${item.totalEstimatedCostUsd.toFixed(4)}, checks ${item.passedChecks}/${item.totalChecks}`
    );
  }

  lines.push("", "## Support scorecard", "");

  for (const item of report.supportScorecard) {
    lines.push(`- ${item.language}: ${item.rating}, pass rate ${Math.round(item.passRate * 100)}%, ${item.successfulCases}/${item.totalCases} successful cases`);
  }

  lines.push("", "## Case outputs", "");

  for (const result of report.results) {
    lines.push(`### ${result.label} — ${result.provider} / ${result.model}`, "");
    lines.push(`- Mode: ${result.mode}`);
    lines.push(`- Source -> output: ${result.sourceLanguage} -> ${result.outputLanguage}`);

    if (result.success) {
      lines.push(`- Latency: ${result.trace?.latencyMs ?? "n/a"} ms`);
      lines.push(`- Estimated cost: ${typeof result.trace?.usageEstimate?.estimatedCostUsd === "number" ? `$${result.trace.usageEstimate.estimatedCostUsd.toFixed(6)}` : "n/a"}`);
      lines.push("", "```text", result.output || "", "```");
    } else {
      lines.push(`- Error: ${result.error}`);
    }

    if (result.expectedChecks?.length) {
      lines.push("", `Expected checks: ${result.expectedChecks.join(", ")}`);
      lines.push(`Check results: ${result.evaluatedChecks.map((check) => `${check.check}=${check.status}`).join(", ")}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}
