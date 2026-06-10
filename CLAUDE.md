# CLAUDE.md

@AGENTS.md

Claude-specific picks on top of the portable spec above. AGENTS.md (imported here) carries the project spec, the working boundaries, and the security note. This file adds the Claude Code bits.

<!-- Model picks reviewed 2026-06. Re-check when a new top model ships. -->

## Model strategy

- Plan mode: Opus 4.8. Reasoning, architecture, debugging, diff review. The `opusplan` option in `/model` plans on Opus and drops to Sonnet for execution automatically.
- Implementation: Sonnet 4.6. Speed for the typing and the repetitive cycles.
- Cheap or simple loops: Haiku 4.5.
- Escalation: Fable 5 (`/model fable`) for the genuinely hard, ambiguous problems. Roughly twice the price of Opus, so save it for work that earns it.
- Before switching models, try the cheaper levers: `/effort` raises reasoning depth (high is the default, xhigh for hard agentic work), and `/fast` speeds up Opus output while you iterate.

## The loop

- Plan mode first for anything past a one-line edit: tap Shift+Tab until the mode indicator shows plan. State the change, read the plan, fix it, approve.
- One change at a time. One prompt, one goal. If asked for several things at once, ask which to do first.
- Wrong turn? Press Esc twice to rewind to a checkpoint. `/context` shows what is eating the window. `/clear` when the whole thread is stale; files persist, only chat history clears.
- `/diff-review` before every commit. If the user cannot explain a line, do not commit it.
- `/verify` for any change that adds a package, calls an API, or ingests untrusted input. Claude Code's built-in `/security-review` makes a deeper second pass before shipping.
- Secrets: never paste a key into committed code. Use `.env` locally and the host's env panel for deploys. See the `security` skill.

## Skills index

Load the matching skill before doing the work. The five workflow skills also run as slash commands.

| Skill | Use when |
|---|---|
| `voice` | Generating copy the user will publish. |
| `sparring-partner` | Pressure-testing an idea, a plan, or a draft before building. |
| `security` | Wiring untrusted input into tools or automations. |
| `scope` (`/scope`) | Sizing an idea before any new build. |
| `diff-review` (`/diff-review`) | Explaining the diff before every commit. |
| `verify` (`/verify`) | Checking packages, APIs, and untrusted input before merge. |
| `ship` (`/ship`) | Lint, build, deploy. User-invoked only; Claude never runs it on its own. |
| `share` (`/share`) | Writing share copy once v1 is live. |

## Project-specific overrides

[Add anything Claude-specific this project needs. Examples: "always run with --dry-run first," "never modify the seed data file," "ask before touching the auth middleware." Save /ship's lint, build, and deploy commands here too.]
