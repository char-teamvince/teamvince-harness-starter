# Optional: LLM-graded eval

This is the one advanced piece in the starter. Skip it until your project has a clear notion of "good output." It mirrors the eval the teamvince site runs in CI.

## What it does

`eval-output.mjs` grades a file 1 to 5 against your project's `AGENTS.md` (the definition of done and any voice or style rules in it). It returns a score, a one-line summary, and per-line flags with rewrite suggestions. It is an LLM-as-judge, not a unit test, so reach for it on copy and other open-ended output where a regex cannot tell good from bad.

## Why bother

Giving the agent a way to grade its own output is the highest-impact thing you can do to raise quality. Simon Willison's version of this is a conformance suite the agent runs against. Anthropic's version is "give Claude a way to verify its work." This is the lightweight take: one graded check you can run before you ship.

## Run it (from the repo root)

```bash
npm install --prefix evals          # pulls @anthropic-ai/sdk into evals/
export ANTHROPIC_API_KEY=sk-ant-...
node evals/eval-output.mjs README.md
```

With no key set, the script prints a skip line and exits 0, so it stays safe in forks and in CI.

## Tunables

- `EVAL_MODEL` (default `claude-opus-4-8`)
- `EVAL_PASS_THRESHOLD` (default `4`; below this the script exits 1)

## Make it yours

The rubric is your `AGENTS.md`. Tighten section 6 (definition of done) and add explicit voice rules, and the grade gets sharper. When the eval and your taste disagree, trust your taste and fix the spec.
