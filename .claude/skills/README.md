# Skills

Skills are where your context compounds. A Skill is a folder with a `SKILL.md` file: frontmatter (`name`, `description`) plus the workflow body. The skill loads only when its description matches the task.

CLAUDE.md does not compound across projects. Skills do. The `sparring-partner` skill in this starter can follow you into the next repo without a single edit.

## Why this is cheap

Progressive disclosure. At session start, Claude Code loads only the name and description of each skill into context. The full body loads only when the skill triggers. A thirty-skill library costs about the same as no skills at all, until one is actually needed. So there is no reason to keep skills out of a beginner project.

## What ships in this starter

| Skill | Use when |
|---|---|
| `scope` (`/scope`) | Sizing an idea before any new build. Seven questions, honest verdict. |
| `diff-review` (`/diff-review`) | Explaining the diff in plain English before every commit. |
| `verify` (`/verify`) | Checking packages, endpoints, behavior, and untrusted input before merge. |
| `ship` (`/ship`) | Lint, build, deploy in sequence. User-invoked only. |
| `share` (`/share`) | Tweet, Loom outline, and attribution once v1 is live. |
| `voice` | Generating copy the user will publish: UI strings, README, marketing, social posts. |
| `sparring-partner` | Pressure-testing an idea, a plan, or a draft before building or publishing. |
| `security` | Wiring untrusted input into tools or automations. Checks the lethal trifecta. |

## Slash command or automatic

Every skill here can be typed by name (`/scope`, `/verify`). Claude can also load one on its own when its description matches the task. `ship` is the exception: its frontmatter sets `disable-model-invocation: true`, so a deploy only happens when you type `/ship` yourself. Use that flag on any skill that pushes, sends, or spends.

## Add your own

When you catch yourself running the same prompt twice a week, it wants to be a Skill:

1. Make a folder: `.claude/skills/<your-skill-name>/`
2. Add `SKILL.md` with frontmatter (`name`, `description`) and the workflow body. Keep it short.
3. List it in the Skills index in `CLAUDE.md` so the next person knows it exists.

The old flat format (`.claude/commands/<name>.md`) still works in Claude Code, but folders with a `SKILL.md` are the current convention: same slash command, plus room for frontmatter options and bundled files.

## Install ready-made skills

Anthropic ships official Skills you can install with `/plugin` (frontend-design, docx, xlsx, pptx, pdf). For a first project, `frontend-design` keeps your UI from looking like generic AI output. Install one from the marketplace before authoring your own.

## The permission allowlist

`.claude/settings.json` ships a conservative allowlist: safe, read-only commands run without a prompt; anything that pushes, installs, deletes, or hits the network still asks first. A deny list blocks reads of `.env` and `.env.local` outright, which keeps your keys out of the model's context even if a prompt asks for them. Personal overrides go in `.claude/settings.local.json`, which is gitignored. Edit the allowlist as you learn which commands you trust.
