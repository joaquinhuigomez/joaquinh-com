# joaquinh.com

Portfolio site for `joaquinh.com`, plus a deployable `Verba` speech-to-draft showcase under `labs/verba`.

## Stack

- Vite
- Plain HTML, CSS, and JS
- Single content source in `src/content.js`
- Cloudflare Pages Functions for the Verba API
- Cloudflare D1 for shared Verba eval history

## Local development

```bash
npm install
npm run dev
```

## Verba local preview

The `labs/verba/workspace` page calls same-origin API routes under `functions/api`.

1. Create `.dev.vars` from `.dev.vars.example`
2. Optional: add your OpenAI API key
3. Run a Cloudflare Pages preview:

```bash
npm run preview:pages
```

This builds the static assets and serves both the site and the Pages Functions together.
It also applies the local D1 migrations automatically so the shared eval store is available during preview.

If you are using local ASR mode, start the full local stack together with:

```bash
npm run preview:verba
```

Provider behavior:

- `VOICE_WORKSPACE_PROVIDER=demo` runs a no-key demo provider so the full UI can be tested without live model calls.
- `VOICE_WORKSPACE_PROVIDER=local` sends transcription requests to a local ASR server such as `faster-whisper`.
- `VOICE_WORKSPACE_PROVIDER=openai` uses the OpenAI routes and requires `OPENAI_API_KEY`.
- If `VOICE_WORKSPACE_PROVIDER` is omitted, the app defaults to `openai` when a key exists and `demo` when it does not.
- `VOICE_WORKSPACE_TEXT_PROVIDER` controls the Step 3 draft engine independently from speech. Supported values are `local`, `openai`, `anthropic`, and `demo`.
- The workspace now supports `Fast`, `Premium`, and `Benchmark` inference presets. `Benchmark` can run multiple draft routes side by side through `/api/compare`.

### Local ASR mode

To run a real local transcriber without OpenAI:

1. Set `.dev.vars` with:
   - `VOICE_WORKSPACE_PROVIDER=local`
   - `VOICE_WORKSPACE_TEXT_PROVIDER=local`
   - `LOCAL_ASR_URL=http://127.0.0.1:9001/transcribe`
   - `LOCAL_TEXT_URL=http://127.0.0.1:11434/api/chat`
   - `LOCAL_TEXT_MODEL=llama3.2:latest`
2. Start the ASR server:

```bash
npm run asr:local
```

3. Make sure Ollama is running locally with the model you want to use for Step 3 text processing.
4. In another terminal, start the Pages preview:

```bash
npm run preview:pages
```

### Hosted text providers

Verba can keep ASR local while routing the draft step to a hosted model.

- `VOICE_WORKSPACE_TEXT_PROVIDER=openai`
  - requires `OPENAI_API_KEY`
  - default text model comes from `OPENAI_TEXT_MODEL`
- `VOICE_WORKSPACE_TEXT_PROVIDER=anthropic`
  - requires `ANTHROPIC_API_KEY`
  - default text model comes from `ANTHROPIC_TEXT_MODEL`

You can also override provider and model per run from the Verba workspace UI.

### Eval runner

Verba includes an offline eval runner that replays the same draft cases across providers and saves both JSON and Markdown reports.

Example:

```bash
npm run eval:verba -- --providers openai=gpt-5-mini,anthropic=claude-sonnet-4-0
```

To publish the current local benchmark summary into the landing page support panel:

```bash
npm run scorecard:verba
```

Defaults:

- dataset: `evals/verba-benchmark.sample.json`
- reports output: `evals/reports/`
- env source: `.dev.vars`
- published scorecard output: `public/verba-support-scorecard.json` when `--publish-scorecard` is used
- published public benchmark report: `public/verba-benchmark-report.md` when `--publish-report` is used

The workspace also logs draft runs and human eval entries in browser storage so you can export a local bundle while iterating on prompts and models.
When the `VERBA_EVALS` D1 binding is available, Verba also syncs those records into the shared store through `/api/evals`.

## Production build

```bash
npm run build
```

The static output is written to `dist/`.

## Cloudflare Pages sync

To push the current local repo state to the hosted Pages project:

```bash
npm run deploy:pages
```

That command rebuilds the multi-page site, applies remote D1 migrations, and deploys `dist/` to the `joaquinh-com` Pages project, which keeps the portfolio homepage and the Verba routes aligned with the same build.

## Cloudflare Pages

Recommended project settings:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22` or newer

If you want to manage deploys with Wrangler, this repo already includes a `wrangler.toml` compatible with static output.

## Content updates

- Main page copy, stats, links, projects, and contributions live in `src/content.js`.
- Proof-strip numbers were last verified on March 17, 2026.
- The Verba landing route lives at `labs/verba/index.html`.
- The Verba case-study route lives at `labs/verba/case-study/index.html`.
- The Verba workspace route lives at `labs/verba/workspace/index.html`.
- Client-side app logic for the Verba product lives in `src/verba-landing.js`, `src/verba-case-study.js`, and `src/verba-workspace.js`.
- Server-side transcription and processing routes live in `functions/api`.
- D1 schema migrations live in `migrations/`.
