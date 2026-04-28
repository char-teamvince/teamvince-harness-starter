# teamvince Agent Harness Starter

The minimum viable agent harness for shipping real things with Claude Code. Drop this into any new project, fill in the templates, and you have a working spec-first loop in under ten minutes.

This is the harness Vince uses on his own projects. Battle-tested. Opinionated on purpose.

## What is in this repo

```
.
├── AGENTS.md              # Open-standard spec, any agent reads it (Cursor, Codex, Claude)
├── CLAUDE.md              # Claude-specific behavior on top of AGENTS.md
├── .env.example           # Template for your secrets, never commit the real .env
├── .gitignore             # Keeps .env out of git
├── .claude/
│   ├── commands/
│   │   ├── ship.md        # /ship, lint and deploy in sequence
│   │   ├── diff-review.md # /diff-review, plain-English diff explanation
│   │   ├── verify.md      # /verify, three-check verification before merge
│   │   ├── scope.md       # /scope, run an idea through the scope filter
│   │   └── loom-prep.md   # /loom-prep, generate the 60-second mid-cohort demo script
│   └── skills/
│       └── README.md      # Where Skills go, plus the install pattern
└── README.md              # This file
```

## Quick start (10 minutes)

1. **Clone or download this repo.**
2. **Open `AGENTS.md`.** Fill in the seven sections (project name, lane, what it does, who it is for, what it does NOT do, definition of done, working rules). Save.
3. **Open `CLAUDE.md`.** Fill in the Claude-specific working rules block. Save.
4. **Copy `.env.example` to `.env`.** Add your API keys. Confirm `.env` is in `.gitignore` (it is).
5. **Open the project in Claude Code.** Run `/init` or just start a session. Claude reads both spec files automatically.
6. **Try the slash commands.** Type `/scope` and paste your idea. Type `/diff-review` after a generated change. The commands are markdown files you can edit any time.

## The working loop

Once the harness is in place, the loop is:

1. Think of one change.
2. Press Shift+Tab twice to enter plan mode (Opus 4.7 recommended for planning).
3. Type the change. Read the plan. Fix it if needed.
4. Press Shift+Tab once to switch to implementation (Sonnet 4.6 recommended for execution).
5. Run `/diff-review` to get a plain-English explanation of what changed.
6. Run `/verify` if the change touches packages or APIs.
7. Commit with a one-line message.
8. Back to step one.

## Why two spec files

`AGENTS.md` is the open standard stewarded by the Linux Foundation's Agentic AI Foundation (December 2025). It is read by Cursor, Codex, Copilot, Windsurf, Gemini CLI, and Claude Code. Sixty-thousand-plus projects use it.

`CLAUDE.md` adds Claude-specific behavior on top of AGENTS.md (model picks, plan-mode preferences, safety preferences).

When a better agent ships in six months, your spec moves with you. The asset is the harness, not any single model.

## What this is NOT

- Not a framework. No npm install.
- Not a tutorial. The course is the tutorial.
- Not opinionated on tech stack. Use whatever ships.
- Not auth, payments, multi-user, or native mobile. Those are v2 patches that land in one afternoon each (Clerk, Stripe Checkout, Supabase, Expo).

## Want to go deeper

This harness is the lead-magnet companion to **From Chatbot to Builder**, a 4-week live cohort. The cohort takes the harness from "starter" to "your first shipped tool with a public build story." Details: teamvince.com.

Or just pressure-test your idea against the scope filter at teamvince.com/scope-filter and ship it.

---

teamvince · Brooklyn, NY · teamvince.com
