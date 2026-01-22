---
description: "Global instructions for TODO application development with TDD principles and workflow patterns"
---

# TODO Application Development Instructions

## Project Context

This is a full-stack TODO application with a React frontend and Express backend. Development follows an iterative, feedback-driven approach with emphasis on test-driven development and incremental improvements.

**Current Phase**: Backend stabilization and frontend feature completion

**Tech Stack**:
- Frontend: React with React Testing Library
- Backend: Express with Jest and Supertest
- Monorepo structure with separate frontend/backend packages

## Documentation References

Before making significant changes, consult these project documentation files:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles for all development work:

- **Test-Driven Development**: Follow the Red-Green-Refactor cycle religiously
- **Incremental Changes**: Make small, testable modifications rather than large refactors
- **Systematic Debugging**: Use test failures as guides to identify and fix issues
- **Validation Before Commit**: Ensure all tests pass and there are no lint errors before committing

## Testing Scope

This project focuses on **unit tests and integration tests ONLY**:

**Backend Testing**:
- Jest + Supertest for API endpoint testing
- Test API routes, middleware, and business logic
- Run tests with `npm test` in the backend package

**Frontend Testing**:
- React Testing Library for component unit and integration tests
- Test component behavior, user interactions, and state management
- Manual browser testing for full UI verification
- Run tests with `npm test` in the frontend package

**Important Constraints**:
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: This lab focuses on unit/integration testing patterns without e2e complexity

### Testing Approach by Context

**Backend API Changes**:
1. Write Jest tests FIRST (RED)
2. Run tests and verify they fail (GREEN)
3. Implement the feature to pass tests (REFACTOR)
4. Refactor if needed while keeping tests green

**Frontend Component Features**:
1. Write React Testing Library tests FIRST for component behavior (RED)
2. Run tests and verify they fail (GREEN)
3. Implement the component feature to pass tests (REFACTOR)
4. Follow with manual browser testing for full UI flows

This is **true TDD**: Always write the test first, then write code to pass the test.

## Workflow Patterns

### 1. TDD Workflow (Red-Green-Refactor)

```
Write/Fix Test → Run Test → Fail (Red) → Implement → Pass (Green) → Refactor
```

- Always start with a failing test
- Implement minimal code to make it pass
- Refactor only when tests are green
- Re-run tests after refactoring

### 2. Code Quality Workflow

```
Run Lint → Categorize Issues → Fix Systematically → Re-validate → Commit
```

- Run linter to identify issues
- Group related issues (imports, formatting, unused vars, etc.)
- Fix issues category by category
- Verify fixes don't break tests
- Commit clean code

### 3. Integration Workflow

```
Identify Issue → Debug → Test → Fix → Verify End-to-End
```

- Reproduce the issue systematically
- Write a test that captures the bug
- Fix the implementation
- Verify the fix across related components
- Test manually in browser if UI-related

## Agent Usage

Use specialized agents for specific types of work:

**tdd-developer Agent**:
- Use for test-related work and TDD cycles
- Writing new tests (unit, integration)
- Following Red-Green-Refactor workflow
- Test debugging and fixing failing tests
- Invoke with `@tdd-developer` in chat

**code-reviewer Agent**:
- Use for addressing lint errors and code quality
- Code cleanup and refactoring
- Fixing code style issues
- Ensuring adherence to best practices
- Invoke with `@code-reviewer` in chat

**Default (GitHub Copilot)**:
- General development questions
- Feature implementation (after tests exist)
- Documentation updates
- Architecture discussions

## Memory System

This project uses a two-tier memory system to track patterns, decisions, and learnings:

**Persistent Memory**: This file (.github/copilot-instructions.md) contains foundational principles and workflows that rarely change. It provides the "operating system" for development.

**Working Memory**: The `.github/memory/` directory contains discoveries and patterns that evolve during development:

- **session-notes.md** (committed): Historical summaries of completed sessions. Update at the END of each work session with key accomplishments, findings, and outcomes.

- **patterns-discovered.md** (committed): Catalog of recurring code patterns and solutions. Document a pattern after it appears 2+ times or solves a broadly applicable problem.

- **scratch/working-notes.md** (NOT committed): Active scratchpad for the current session. Take notes here during development, then summarize key findings into session-notes.md at end of session.

**How to Use During Development**:

1. **Start of session**: Open `scratch/working-notes.md` for active note-taking
2. **During work**: Document findings, decisions, and blockers in scratch notes
3. **End of session**: 
   - Summarize key findings into `session-notes.md`
   - Document recurring patterns in `patterns-discovered.md`
   - Clear scratch notes for next session

**How AI Uses This**:
- When providing suggestions, AI agents will reference discovered patterns and recent session notes
- This enables context-aware recommendations aligned with your project's specific learnings
- See [.github/memory/README.md](./memory/README.md) for detailed usage instructions

## Workflow Utilities

Use GitHub CLI commands for workflow automation (available in all modes):

**List Open Issues**:
```bash
gh issue list --state open
```

**Get Issue Details**:
```bash
gh issue view <issue-number>
```

**Get Issue with Comments**:
```bash
gh issue view <issue-number> --comments
```

**Finding Exercise Steps**:
- The main exercise issue has "Exercise:" in the title
- Individual steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked
- Parse issue comments to identify the current step to execute

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks (dependencies, configs)
- `docs:` - Documentation updates
- `refactor:` - Code refactoring without functional changes
- `style:` - Code style/formatting changes

**Examples**:
```bash
git commit -m "feat: add delete todo functionality"
git commit -m "test: add tests for todo creation endpoint"
git commit -m "fix: resolve duplicate todo rendering issue"
```

### Branch Strategy

- **Main branch**: `main` - stable, tested code
- **Feature branches**: `feature/<descriptive-name>`
- **Bugfix branches**: `fix/<descriptive-name>`

**Workflow**:
```bash
# Create feature branch
git checkout -b feature/add-todo-editing

# Stage all changes before committing
git add .

# Commit with conventional format
git commit -m "feat: implement todo editing UI"

# Push to correct branch
git push origin feature/add-todo-editing
```

### Pre-Commit Checklist

Before committing, ensure:
- [ ] All tests pass (`npm test` in affected packages)
- [ ] No lint errors (`npm run lint` if available)
- [ ] Code follows project conventions
- [ ] Commit message uses conventional format
- [ ] Changes are staged (`git add .`)
- [ ] Pushing to correct branch
