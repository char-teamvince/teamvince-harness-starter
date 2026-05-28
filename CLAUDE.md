# CLAUDE.md

@AGENTS.md

Claude-specific picks on top of the portable spec above. AGENTS.md (imported here) carries the project spec, the working boundaries, and the security note. This file adds the Claude Code bits.

<!-- Model picks reviewed 2026-05. Re-check when a new Opus ships. -->

## Model strategy

- Plan mode: the current top Opus (Opus 4.8). Reasoning, architecture, debugging, diff review.
- Implementation: Sonnet 4.6. Speed for the typing and the repetitive cycles.
- Cheap or simple loops: Haiku 4.5.
- When a plan looks fuzzy, raise the thinking or effort budget before switching models. It is the cheaper lever.

## The loop

- Plan mode first (Shift+Tab twice) for anything past a one-line edit. State the change, read the plan, fix it, approve.
- One change at a time. One prompt, one goal. If asked for several things at once, ask which to do first.
- `/clear` when stuck in a loop or the context feels stale. Files persist; only chat history clears. Threshold: same issue three times.
- `/diff-review` before every commit. If the user cannot explain a line, do not commit it.
- `/verify` for any change that adds a package, calls an API, or ingests untrusted input.
- Secrets: never paste a key into committed code. Use `.env` locally and the host's env panel for deploys. See the `security` skill.

## Skills index

Load the matching skill before doing the work.

| Skill | Use when |
|---|---|
| `voice` | Generating copy the user will publish. |
| `sparring-partner` | Pressure-testing an idea, a plan, or a draft before building. |
| `security` | Wiring untrusted input into tools or automations. |

## Project-specific overrides

[Add anything Claude-specific this project needs. Examples: "always run with --dry-run first," "never modify the seed data file," "ask before touching the auth middleware." Save /ship's lint, build, and deploy commands here too.]
