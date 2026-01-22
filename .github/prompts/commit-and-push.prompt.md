---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push Changes

You are committing work to a feature branch using conventional commit format and Git best practices.

## Task

${input:branchName:Feature branch name (REQUIRED - e.g., feature/step-5-1-backend-tests)}

## Instructions

1. **Analyze Changes**
   - Run `git status` to see modified files
   - Run `git diff` to review changes
   - Understand the scope and purpose of the changes

2. **Generate Commit Message**
   - Use conventional commit format from `.github/copilot-instructions.md`
   - Format: `<type>: <description>`
   - Types: `feat`, `fix`, `test`, `chore`, `docs`, `refactor`, `style`
   - Examples:
     - `feat: implement todo creation endpoint`
     - `test: add integration tests for DELETE endpoint`
     - `fix: resolve toggle always setting to true`
   - Make the message descriptive and specific

3. **Branch Management**
   - Check if branch exists: `git branch --list ${branchName}`
   - If branch doesn't exist: `git checkout -b ${branchName}`
   - If branch exists: `git checkout ${branchName}`
   - **IMPORTANT**: DO NOT commit to `main` or any other branch

4. **Commit and Push**
   - Stage all changes: `git add .`
   - Commit with generated message: `git commit -m "<message>"`
   - Push to the specified branch: `git push origin ${branchName}`
   - If this is the first push, use: `git push -u origin ${branchName}`

5. **Verification**
   - Confirm the push was successful
   - Report the branch name and commit message to the user

## Output

Provide:
- The generated commit message
- The branch name used
- Confirmation that changes were pushed
- Next steps (if applicable, such as creating a PR)
