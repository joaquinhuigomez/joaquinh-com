# Verba Eval Report

- Generated: 2026-03-19T10:07:53.986Z
- Dataset: evals/verba-benchmark.sample.json
- Cases: 5

## Summary

- local / llama3.2:latest: 5/5 successful, avg latency 1961 ms, est. cost $0.0000, checks 8/11

## Support scorecard

- Mandarin: stable, pass rate 86%, 4/4 successful cases
- French: stable, pass rate 100%, 1/1 successful cases

## Case outputs

### Traditional Mandarin stays Traditional — local / llama3.2:latest

- Mode: draft
- Source -> output: Mandarin -> Mandarin
- Latency: 3423 ms
- Estimated cost: n/a

```text
我真的很想把這件事講清楚，因為現在大家都搞混了。
```

Expected checks: traditional-script-preserved, same-language-rewrite
Check results: traditional-script-preserved=pass, same-language-rewrite=fail

### Mandarin to Spanish — local / llama3.2:latest

- Mode: draft
- Source -> output: Mandarin -> Spanish
- Latency: 1624 ms
- Estimated cost: n/a

```text
Hoy el progreso fue un poco más lento de lo esperado, pero ya se ha encontrado el principal problema.
```

Expected checks: spanish-output, no-chinese-leftover
Check results: spanish-output=pass, no-chinese-leftover=pass

### Colloquial Mandarin with profanity — local / llama3.2:latest

- Mode: draft
- Source -> output: Mandarin -> English
- Latency: 2204 ms
- Estimated cost: n/a

```text
I truly despise the thought of killing that little tramp, he's a worthless piece of trash.
```

Expected checks: meaning-preserved, policy-behavior-visible, no-random-hallucination
Check results: meaning-preserved=manual, policy-behavior-visible=pass, no-random-hallucination=manual

### Code-switched team update — local / llama3.2:latest

- Mode: draft
- Source -> output: Mandarin -> English
- Latency: 1325 ms
- Estimated cost: n/a

```text
This feature was originally scheduled to ship on Friday, but there is a blocker in the backend that has not been fully resolved.
```

Expected checks: code-switch-handled, english-output
Check results: code-switch-handled=pass, english-output=pass

### French prompt generation — local / llama3.2:latest

- Mode: prompt
- Source -> output: French -> English
- Latency: 1230 ms
- Estimated cost: n/a

```text
Create a clear prompt for an agent to design an elegant product page.
```

Expected checks: english-prompt, actionable
Check results: english-prompt=pass, actionable=pass
