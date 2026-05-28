#!/usr/bin/env sh
# Pre-push secret guard for the teamvince harness.
# Wired as a PreToolUse(Bash) hook in .claude/settings.json. It only acts on
# `git push`; every other Bash command passes through untouched.
# Scans tracked content for obvious secrets and a tracked .env.
# Exit 2 blocks the command and tells the agent what to fix.
#
# This is a starting point, not a vault. It catches the common mistakes
# (a pasted key, a committed .env). Add patterns as your project needs them.

set -u

# Only guard git push. Read the tool input from stdin; pass through otherwise.
input=$(cat 2>/dev/null || true)
case "$input" in
  *"git push"*) ;;
  *) exit 0 ;;
esac

# Key-shaped strings that should never be committed.
patterns='sk-ant-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[baprs]-[A-Za-z0-9-]{10,}|ghp_[A-Za-z0-9]{20,}'

found=""

# A tracked .env is almost always a mistake.
if git ls-files --error-unmatch .env >/dev/null 2>&1; then
  found="${found}
  - .env is tracked by git. It should be gitignored, not committed."
fi

# Scan tracked files for secrets. .env.example holds empty placeholders, skip it.
hits=$(git grep -nIE "$patterns" -- . 2>/dev/null | grep -v '\.env\.example' | head -20)
if [ -n "$hits" ]; then
  found="${found}
  - Possible secret(s) in tracked files:
$hits"
fi

if [ -n "$found" ]; then
  printf '%s\n' "Blocked git push: possible secret in the repo.${found}" >&2
  printf '%s\n' "" >&2
  printf '%s\n' "Move the value to .env (already gitignored), rotate the key if it was real, then push again." >&2
  exit 2
fi

exit 0
