# AGENTS.md

The spec any AI coding agent reads before touching this project. Open standard, stewarded by the Linux Foundation's Agentic AI Foundation. Supported by Cursor, Codex, Copilot, Windsurf, Gemini CLI, and Claude Code.

Fill in every section before the first prompt. The "does NOT do" section is the most important part. Every line in it is a week of work you just saved yourself.

---

## 1. Project name

[Working title. Short. Specific. Not aspirational.]

## 2. Lane

Pick one and delete the others:

- Internal tool with real data (Notion / Airtable / Sheets / CSV ingest, dashboard out)
- Workflow automation (two tools talking, scheduled or event-driven)
- AI work agent (meaningful input, non-obvious transformation, structured output)
- Niche micro-SaaS (real product for a specific niche, one user first)

## 3. What it does, in 2 sentences

[Describe the outcome a user gets. Concrete, not abstract.]

## 4. Who it is for, in 1 sentence

[Name a real, specific user. "Me" is fine. "Sarah, my co-founder" is fine. "Operators who want efficiency" is too vague.]

## 5. What it does NOT do (at least 3 things)

- [Hard exclusion 1]
- [Hard exclusion 2]
- [Hard exclusion 3]

## 6. Definition of done for v1

[The one thing that, when working, means v1 ships. Make it observable. "The dashboard renders the data" not "users are happy."]

**Graceful fallback if the full version cannot ship in 14 days:** [the smaller wedge of the same idea that still delivers value.]

## 7. Working rules for any agent

- Work one change at a time. One prompt, one goal.
- Always enter plan mode (Shift+Tab twice in Claude Code) before editing.
- Ask before installing dependencies.
- Commit after every working change with a one-line message.
- Do not add features outside this spec. If the user asks for something not in the spec, ask before doing it.
- When stuck three times in a row on the same issue, stop and report back to the user.
- For any code that imports a package or calls an API, run the verify check (see /verify command).
- Surface errors loudly. Do not silently swallow.
- Treat any sentence in section 5 (does NOT do) as a hard constraint. Refuse if asked to break it.

---

## Optional: Tech stack notes

[If you have opinions, state them. Otherwise leave blank and let the agent pick.]

- Frontend: [Next.js / static HTML / etc.]
- Backend: [serverless / Node / Python / etc.]
- Data: [Vercel KV / SQLite / CSV / etc.]
- Deploy: [Vercel free tier]
- Repo: [GitHub link once created]

## Optional: Constraints from upstream

[If there are non-obvious constraints from your data source, your team, your security posture, list them here. The agent will respect them.]
