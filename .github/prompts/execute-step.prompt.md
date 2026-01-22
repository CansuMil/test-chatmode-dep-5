---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute Current GitHub Issue Step

You are executing the instructions from a GitHub Issue step in this exercise-based project.

## Task

${input:issueNumber:GitHub issue number (leave empty to auto-detect)}

## Instructions

1. **Find the Exercise Issue**
   - If issue number not provided, use `gh issue list --state open` to find the issue with "Exercise:" in the title
   - Get the full issue with comments: `gh issue view <issue-number> --comments`

2. **Parse Step Instructions**
   - Locate the latest step comment in the issue
   - Extract all `:keyboard: Activity:` sections from that step
   - Understand the requirements and acceptance criteria

3. **Execute Activities Systematically**
   - Work through each Activity section in order
   - Follow TDD principles (Red-Green-Refactor cycle)
   - Use the testing scope from project instructions - **NO e2e frameworks** (no Playwright, Cypress, Selenium)
   - Focus on unit and integration tests only (Jest, React Testing Library, Supertest)
   - Make incremental changes and validate as you go
   - Update todo list to track progress through activities

4. **DO NOT Commit or Push**
   - Complete the work but leave changes uncommitted
   - That's the responsibility of the `/commit-and-push` prompt
   - After completing all activities, inform the user to run `/validate-step`

5. **Important Constraints**
   - Follow testing guidelines from `.github/copilot-instructions.md`
   - Respect TDD workflow (write/fix tests first, then implement)
   - Stay within testing scope: backend (Jest+Supertest), frontend (React Testing Library)
   - Reference Workflow Utilities section in copilot-instructions.md for gh CLI patterns

## Output

Provide a summary of:
- Which step was executed
- Activities completed
- Any issues encountered
- Reminder to run `/validate-step <step-number>` next
