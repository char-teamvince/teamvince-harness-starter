# Skills

Drop reusable workflows here. A Skill is a folder with a SKILL.md file describing a workflow Claude should follow when triggered.

Anthropic ships official Skills you can install via `/plugin` (frontend-design, docx, xlsx, pptx, pdf, etc.). For most students, install one from the marketplace before authoring your own.

## When a prompt wants to be a Skill

Anthropic's rule of thumb: when you find yourself running the same prompt twice a week, it wants to become a Skill. The pattern:

1. Make a folder under `.claude/skills/<your-skill-name>/`
2. Add `SKILL.md` with frontmatter (`name`, `description`) and the workflow body
3. The skill loads only when its description matches the user's task

## Recommended starter Skill

For most teamvince cohort projects, install Anthropic's `frontend-design` skill via `/plugin`. It keeps your UI from looking like generic-AI-output.

Subagents, hooks, and authoring plugins are graduate-school topics. Stay out of those for v1.
