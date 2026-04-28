# CLAUDE.md

Claude-specific behavior on top of AGENTS.md. Read AGENTS.md first. This file adds picks and preferences specific to Claude.

---

## Model strategy

**Default pair pattern:**

- **Plan mode runs on Opus 4.7.** Reasoning matters here. Architecture, debugging, diff review.
- **Implementation runs on Sonnet 4.6.** Speed matters here. Typing the change, repetitive cycles.
- When the plan looks fuzzy, increase thinking budget on the plan. Cheap fix. Opus 4.7 supports it natively.

Anthropic's April 2026 cost-per-completed-task data shows the pair pattern often costs less than Sonnet-only because Opus produces fewer failed attempts.

## Plan mode is the default entry point

For any change beyond a one-line edit:

1. Open plan mode (Shift+Tab twice).
2. State the change in plain English.
3. Read the plan. Fix it if needed.
4. Approve. Switch to implementation.

Skip plan mode only for trivial edits the user has already specified exactly.

## The one-change rule

One prompt, one goal. No "add a footer, change the header color, fix the bug, and make it mobile-responsive" mega-prompts. Bundling produces messy diffs and untrackable bugs.

If the user asks for multiple things at once, ask which to do first.

## /clear is the reset button

When stuck in a loop or context window feels stale, suggest `/clear`. CLAUDE.md and files persist. Only chat history clears.

Trigger threshold: same issue three times in a row.

## Diff review is mandatory before commit

Before any commit, run `/diff-review` (custom slash command in this repo). Output a plain-English line-by-line explanation. Flag anything you do not understand.

If the user does not understand a section of the diff, do not let them merge it without asking. Comprehension debt is the named enemy.

## Verify-before-trust

For any code that adds a package, calls an API, or invokes an external tool, run the three-check verification (see `/verify` command):

1. Package check (does it exist on npm or PyPI with sane download counts?)
2. API endpoint check (does the URL exist in official docs?)
3. Behavior check (run with one real input, confirm shape)

Hallucinated packages and invented API endpoints are real attack vectors in 2026. Catch them before deploy.

## Secrets

- Never paste a secret into code that will be pushed to GitHub.
- Use `.env` locally. Use Vercel Environment Variables for deploys.
- If a key has been pushed publicly, surface this immediately and walk the user through rotation.

## Update Claude Code weekly

If the user reports "output feels worse than yesterday," check `github.com/anthropics/claude-code/issues` before assuming user error. Claude Code regressions are real and have been logged in 2026.

## When to escalate to the user

- The plan would touch more than three files.
- A change requires installing a new dependency.
- A change touches secrets or `.env`.
- The agent is unsure which interpretation of a request is correct.
- Three iterations on the same issue have not resolved it.

In all five cases, stop and ask the user. Do not guess.

## Voice rules for any user-facing text

If you generate copy that the user will publish (UI strings, README, marketing pages, social posts):

- No em dashes.
- No AI buzzwords (delve, leverage, unleash, unlock, navigate the landscape, tapestry, paradigm, synergy, empower).
- No hollow affirmations.
- No sentences starting with "I."
- teamvince is always lowercase, one word.

These are the teamvince writing rules. Follow them by default unless the user specifies a different brand.

---

## Project-specific overrides

[Add anything Claude-specific that this particular project needs. Examples: "always run with --dry-run first," "never modify the seed data file," "ask before touching the auth middleware."]
