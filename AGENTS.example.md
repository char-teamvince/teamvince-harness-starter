# AGENTS.md (worked example)

This is a fully filled-in example spec for a small, shippable project. Use it as a reference for what a passing `/scope` output looks like before you fill in the real `AGENTS.md` template.

The example below would pass all seven scope filter questions: ships in 14 days at 5 to 6 hours per week, works for one user, no auth, no payments, has a graceful fallback for the most fragile dependency, fits under 75 words, and the wedge is clearly defined.

---

## 1. Project name

Weekly Three

## 2. Lane

AI work agent (meaningful input, non-obvious transformation, structured output)

## 3. What it does, in 2 sentences

Takes a free-text Sunday-night journal entry and outputs three concrete priorities for the week ahead. Surfaces patterns across past weeks so the user can see what they keep avoiding.

## 4. Who it is for, in 1 sentence

Me, one user, my own journal, run from a local terminal or a single-page web app.

## 5. What it does NOT do (at least 3 things)

- Does NOT support multiple users. Single-user only.
- Does NOT have authentication. Local-only or single-user deploy.
- Does NOT integrate with calendar tools. Output is plain text the user can paste anywhere.
- Does NOT track completion. The user decides what they did with their priorities; the tool does not nag.

## 6. Definition of done for v1

Given one Sunday journal entry as input, the tool outputs three numbered priorities and a one-line "pattern across the last 4 weeks" note. Output is readable in the terminal or rendered in a single HTML page.

**Graceful fallback if the full version cannot ship in 14 days:** Skip the cross-week pattern detection. Ship just the three priorities from a single journal entry. Pattern detection becomes v2.

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

- Frontend: Single static HTML page with vanilla JS for v2. v1 is CLI-only, no frontend.
- Backend: Node script with the Anthropic SDK. Local CLI for v1; can wrap in a Vercel function for v2.
- Data: Plain markdown files in a `journals/` folder, one per week. Filenames in `YYYY-MM-DD.md` format.
- Deploy: Local CLI for v1. Vercel free tier if a web UI is added.
- Repo: Private GitHub repo.

## Optional: Constraints from upstream

- Journal entries contain personal reflections. Do not log entries to any external service. Processing happens locally with the Anthropic API; entries are sent to Claude as input but not persisted server-side.
- Do not commit the `journals/` folder. Add `journals/` to `.gitignore` before the first commit.
- The pattern-detection feature requires at least 4 weeks of journal data. Until then, skip the pattern line in the output.
