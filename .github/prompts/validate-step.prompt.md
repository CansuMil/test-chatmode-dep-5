---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Step Completion

You are validating that all success criteria for a specific step have been met before proceeding.

## Task

${input:stepNumber:Step number to validate (REQUIRED - e.g., 5-0, 5-1, 5-2)}

## Instructions

1. **Find the Exercise Issue**
   - Use `gh issue list --state open` to find the issue with "Exercise:" in the title
   - Get the full issue with comments: `gh issue view <issue-number> --comments`

2. **Locate Step Content**
   - Search through the issue to find "# Step ${stepNumber}:"
   - Extract the complete step content including:
     - Step description
     - Activity sections
     - **Success Criteria** section

3. **Extract Success Criteria**
   - Find all checkboxes or bullet points under "Success Criteria"
   - List each criterion that needs validation
   - Understand what each criterion requires

4. **Validate Each Criterion**
   - For test-related criteria:
     - Run tests: `npm test` (in appropriate package)
     - Check for passing tests and no failures
   - For lint-related criteria:
     - Run linter: `npm run lint` (if available)
     - Check for no errors or warnings
   - For functionality criteria:
     - Check file contents
     - Verify implementations exist
     - Review code for completeness
   - For documentation criteria:
     - Verify required files exist
     - Check content is complete

5. **Report Results**
   - Create a checklist showing status of each criterion
   - Mark completed items with ✅
   - Mark incomplete items with ❌
   - Provide specific guidance for any incomplete items

## Output

Provide:
- Step number being validated
- Complete checklist of success criteria with status
- For incomplete items: specific actions needed to complete them
- Overall assessment: "Step ${stepNumber} is COMPLETE" or "Step ${stepNumber} has X incomplete items"
- If complete: reminder to run `/commit-and-push <branch-name>` next
