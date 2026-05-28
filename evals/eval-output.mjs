// Optional LLM-graded eval for the teamvince harness.
// Grades a file's output 1-5 against this project's AGENTS.md (the definition
// of done and any voice or style rules in it), and emits per-line flags with
// rewrite suggestions. Mirrors the pattern the teamvince site runs in CI.
//
// Usage (run from the repo root):
//   node evals/eval-output.mjs <file1> <file2> ...
//   ANTHROPIC_API_KEY=sk-ant-... node evals/eval-output.mjs README.md
//
// Install the SDK first:  npm install --prefix evals
// Skips with exit 0 if ANTHROPIC_API_KEY is not set, so it is safe in forks
// and in CI without a key.

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const apiKey = process.env.ANTHROPIC_API_KEY
const model = process.env.EVAL_MODEL || 'claude-opus-4-8'
const passThreshold = Number(process.env.EVAL_PASS_THRESHOLD || 4)

if (!apiKey) {
  console.log('eval-output: ANTHROPIC_API_KEY not set, skipping.')
  process.exit(0)
}

const files = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))
if (files.length === 0) {
  console.error('eval-output: no files given')
  console.error('usage (from repo root): node evals/eval-output.mjs <file1> <file2> ...')
  process.exit(1)
}

let Anthropic
try {
  Anthropic = (await import('@anthropic-ai/sdk')).default
} catch {
  console.error('eval-output: @anthropic-ai/sdk is not installed.')
  console.error('Run: npm install --prefix evals')
  process.exit(1)
}
const client = new Anthropic({ apiKey })

// The project spec is the rubric. It holds the definition of done and any
// voice or style rules. The system prompt is stable, so it is marked for caching;
// the cache only kicks in once your spec is large (a few thousand tokens), so a
// small starter spec will not cache yet.
let spec = ''
try {
  spec = await fs.readFile(path.join(root, 'AGENTS.md'), 'utf8')
} catch {
  console.error('eval-output: no AGENTS.md at the repo root to grade against.')
  console.error('Run this from the repo root, not from inside evals/.')
  process.exit(1)
}

const systemPrompt = [
  {
    type: 'text',
    text: 'You grade a project artifact against its own spec. Be specific. Quote the lines that miss.',
  },
  {
    type: 'text',
    text: `PROJECT SPEC (AGENTS.md). Grade against the definition of done and any voice or style rules here:\n\n${spec}`,
    cache_control: { type: 'ephemeral' },
  },
]

const responseSchema = {
  type: 'object',
  properties: {
    score: {
      type: 'integer',
      description: 'Overall match to the spec, 1 (off) to 5 (on target).',
    },
    summary: {
      type: 'string',
      description: 'One sentence on what is good or off.',
    },
    issues: {
      type: 'array',
      description: 'Per-line flags. Empty if clean.',
      items: {
        type: 'object',
        properties: {
          excerpt: {
            type: 'string',
            description: 'The exact line or phrase with the issue.',
          },
          problem: {
            type: 'string',
            description: 'Which spec rule or goal it misses.',
          },
          suggestion: {
            type: 'string',
            description: 'A concrete fix.',
          },
        },
        required: ['excerpt', 'problem', 'suggestion'],
        additionalProperties: false,
      },
    },
  },
  required: ['score', 'summary', 'issues'],
  additionalProperties: false,
}

let anyFailed = false

for (const file of files) {
  const absolutePath = path.isAbsolute(file) ? file : path.join(root, file)
  let content
  try {
    content = await fs.readFile(absolutePath, 'utf8')
  } catch (error) {
    console.error(`eval-output: cannot read ${file}: ${error.message}`)
    process.exitCode = 1
    continue
  }

  // Strip HTML so the model grades visible copy, not markup.
  let prose = content
  if (file.endsWith('.html')) {
    prose = content
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }
  const sample = prose.slice(0, 6000)

  const userMessage = `File: ${file}\n\n---\n${sample}\n---\n\nGrade this against the spec. Return strict JSON matching the schema.`

  let response
  try {
    response = await client.messages.parse({
      model,
      max_tokens: 4096,
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'medium',
        format: {
          type: 'json_schema',
          schema: responseSchema,
        },
      },
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })
  } catch (error) {
    console.error(`eval-output: API error for ${file}:`, error.message || error)
    process.exitCode = 1
    continue
  }

  const result = response.parsed_output
  if (!result) {
    console.error(`eval-output: ${file}: model returned no parsed output`)
    process.exitCode = 1
    continue
  }

  console.log(`\n--- ${file} ---`)
  console.log(`Score: ${result.score}/5`)
  console.log(`Summary: ${result.summary}`)
  if (result.issues.length > 0) {
    console.log('Issues:')
    for (const issue of result.issues) {
      console.log(`  • "${issue.excerpt.slice(0, 80)}"`)
      console.log(`    problem: ${issue.problem}`)
      console.log(`    suggest: ${issue.suggestion}`)
    }
  } else {
    console.log('Issues: none')
  }

  if (response.usage) {
    const cacheRead = response.usage.cache_read_input_tokens || 0
    console.log(
      `Tokens: in=${response.usage.input_tokens} out=${response.usage.output_tokens} cache_read=${cacheRead}`,
    )
  }

  if (result.score < passThreshold) {
    anyFailed = true
  }
}

if (anyFailed) {
  console.error(`\neval-output: at least one file scored below ${passThreshold}/5`)
  process.exit(1)
}

console.log(`\neval-output: passed (threshold ${passThreshold}/5)`)
