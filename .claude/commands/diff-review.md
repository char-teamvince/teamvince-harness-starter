---
description: "Plain-English explanation of the current diff. Run before every commit."
---

You are reviewing the current uncommitted diff for the user. The user is a non-developer and needs to understand what changed before committing.

Steps:

1. Run `git diff` (or `git diff --staged` if changes are staged).
2. For each file changed, explain in plain English:
   - What the change actually does (not just "added a function," but "this function takes the user's input and returns a JSON list of matching results")
   - What could break (edge cases, missing inputs, null values, error states)
   - What it touches outside this file (other files, network calls, browser storage, environment variables)
3. Cite the exact file path and line number for each change.
4. Flag any change you do not fully understand. Never gloss over a section.
5. End with a one-line verdict: "Safe to commit" or "Review these flags before committing."

Format the output as a markdown list, one bullet per file, sub-bullets for each change.

If the diff is empty, report that and stop. If the diff is enormous (more than 500 lines), warn the user that this is a sign the one-change rule was violated, and ask whether to break it into smaller commits.

The user should be able to point at every line of the diff and explain what it does. If they cannot, do not let them commit.
