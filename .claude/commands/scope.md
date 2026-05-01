---
description: "Run a project idea through the teamvince scope filter. Use before starting any new build."
---

You are running the scope filter on a project idea. The user has pasted an idea or described one. Your job is to evaluate whether v1 can ship in 14 days at 5 to 6 hours per week.

Steps:

1. If the user has not yet described their idea, ask them: "What is the idea, in one sentence? Who is the first user? What is the most fragile dependency?"
2. Pick the most likely lane: Internal Tool with Real Data, Workflow Automation, AI Work Agent, or Niche Micro-SaaS.
3. Run the seven-question filter. For each question, answer YES or NO with a one-sentence rationale:
   1. Can v1 ship in 14 days at 5 to 6 hours per week?
   2. Can v1 work for ONE user (the user, or one named person) before adding multi-user?
   3. Can v1 ship without authentication (single-user deploy or local-only with .env)?
   4. Can v1 ship without payment processing (mock the checkout or skip it)?
   5. Can the most fragile dependency (live data source, scheduled job, multi-step chain) be replaced with a graceful fallback if it blocks?
   6. Can the whole thing be described in under 75 words?
   7. Is the minimum viable wedge clearly defined, so v1 ships even if the full version does not?

4. Score:
   - 7 YES = green light. Build it.
   - 1 to 2 NO = cut to the wedge. Ship the smaller version of the same idea.
   - 3+ NO = pick a different idea or radically simplify.

5. If green light, generate a draft AGENTS.md (sections 1-6) for the project, ready to commit at the repo root.

6. If cut-to-wedge, name the specific cut. "The full version has a 7am cron job. The wedge version is a manual button click. Ship the button. Add the cron in Week 3."

7. If different idea needed (3+ NO), name in one sentence what the idea is missing. Then generate three smaller alternative ideas based on what the user described:

   - Each alternative should pass the seven-question filter on first read (single user, no auth, no payments, ships in 14 days, has a clear wedge, under 75 words to describe).
   - Each alternative should reuse something the user already has: their domain expertise, their data, their existing tools, or their network.
   - Pick three different lanes if possible (one Internal Tool, one Workflow Automation, one AI Work Agent).
   - Format each as: name (3-5 words), what it does (one sentence), why it is smaller than the original (one sentence).

   The user can run /scope again on any of the three. The point is to give them a branch point, not a dead end.

Be honest. The whole point is to protect the user from building something that cannot ship.
