# Working Memory System

## Purpose

This directory implements a **working memory system** for tracking patterns, decisions, and lessons learned during development. It helps maintain context across sessions and enables AI assistants to provide more informed, context-aware suggestions.

## Memory Architecture

This project uses a **two-tier memory system**:

### 1. Persistent Memory (Long-term)
**Location**: `.github/copilot-instructions.md`

**Purpose**: Foundational principles, workflows, and guidelines that rarely change

**Contains**:
- Core development principles (TDD, incremental changes, validation)
- Testing scope and approach
- Workflow patterns (Red-Green-Refactor, lint loops, etc.)
- Agent usage guidelines
- Git conventions

**Characteristics**:
- Stable and infrequently updated
- Provides the "operating system" for development
- Referenced by all AI agents

### 2. Working Memory (Short to medium-term)
**Location**: `.github/memory/` directory

**Purpose**: Accumulate discoveries, patterns, and session-specific learnings

**Contains**:
- Session summaries (`session-notes.md`)
- Discovered code patterns (`patterns-discovered.md`)
- Active work in progress (`scratch/working-notes.md`)

**Characteristics**:
- Dynamic and frequently updated
- Captures evolving understanding of the codebase
- Provides context for AI suggestions

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the memory system
├── session-notes.md             # Historical summaries of completed sessions (committed)
├── patterns-discovered.md       # Accumulated code patterns and best practices (committed)
└── scratch/                     # Active session work (NOT committed to git)
    ├── .gitignore               # Ignores all scratch files
    └── working-notes.md         # Current session notes and observations
```

## File Purposes

### session-notes.md (Committed)
**Purpose**: Historical record of completed development sessions

**When to update**:
- At the END of a work session
- After completing a major milestone or step
- When wrapping up for the day

**What to include**:
- Session date and focus
- What was accomplished
- Key findings and decisions made
- Outcomes and next steps

**Why it's committed**: 
- Provides historical context for future work
- Creates an audit trail of project evolution
- Helps onboard new developers or AI sessions

### patterns-discovered.md (Committed)
**Purpose**: Catalog of recurring code patterns and solutions

**When to update**:
- After discovering a recurring pattern (appeared 2+ times)
- When solving a problem that may recur
- After debugging an issue with broad applicability

**What to include**:
- Pattern name and context
- Problem it solves
- Implementation solution
- Code examples
- Related files

**Why it's committed**:
- Builds institutional knowledge
- Prevents repeating mistakes
- Guides consistent implementation

### scratch/working-notes.md (NOT Committed)
**Purpose**: Active notes during current work session

**When to update**:
- Throughout active development
- When making discoveries or decisions
- While debugging issues
- When blocked or uncertain

**What to include**:
- Current task and approach
- Real-time findings and observations
- Decisions being made
- Blockers and questions
- Scratchpad for ideas

**Why it's NOT committed**:
- Ephemeral working space
- May contain incomplete thoughts
- Gets summarized into session-notes.md at end of session
- Reduces git noise from temporary notes

## Using the Memory System in Workflows

### During TDD (Test-Driven Development)

**Active Development**:
1. Open `scratch/working-notes.md` at start of session
2. Document which test you're working on
3. Note any unexpected behaviors or patterns
4. Record decisions about implementation approaches

**End of Session**:
1. Summarize which tests were fixed
2. Document any test patterns discovered
3. Add entry to `session-notes.md`
4. If pattern is recurring, add to `patterns-discovered.md`

**Example**:
```markdown
## Working Notes (scratch/working-notes.md during session):
Current Task: Fix POST /api/todos test
- Test expects 201 status but getting 501
- Need to implement actual endpoint logic
- Found pattern: All endpoints need ID generation

## After Session (session-notes.md):
### Session: Backend CRUD Implementation - Jan 22, 2025
- Fixed POST endpoint by implementing ID counter
- Discovered pattern: Service initialization requires empty arrays
- All POST/PUT/DELETE tests now pass
```

### During Linting Workflow

**Active Development**:
1. Copy ESLint errors to `scratch/working-notes.md`
2. Group errors by category
3. Note which fixes worked and why
4. Track any configuration changes

**End of Session**:
1. Document linting patterns discovered
2. Add recurring lint issues to `patterns-discovered.md`
3. Summarize in `session-notes.md`

**Example Pattern Discovered**:
- Pattern: "Unused variables in test files often indicate incomplete test setup"
- Solution: Remove or use the variable appropriately

### During Debugging Workflow

**Active Development**:
1. Document symptoms in `scratch/working-notes.md`
2. Note hypotheses and what you tried
3. Record the root cause when found
4. Document the fix

**End of Session**:
1. Add debugging pattern if applicable
2. Summarize in `session-notes.md`

**Example**:
```markdown
## Scratch Notes (during debugging):
Bug: Toggle always sets completed=true
Tried: Logging state before/after
Found: Line 45 uses assignment (=) instead of toggle (!)
Fix: Changed to !todo.completed

## Pattern Added (if recurring):
Pattern: State Toggle Bugs
- Problem: Boolean state always set to same value
- Cause: Using assignment (=) instead of negation (!)
- Solution: Use !state to toggle
```

## How AI Uses This Memory

When you ask Copilot or a custom agent for help:

1. **Reads Persistent Memory**: Understands project principles and workflows
2. **Reads Working Memory**: Checks recent discoveries and patterns
3. **Applies Context**: Provides suggestions aligned with your patterns
4. **References Patterns**: May point to relevant patterns discovered

**Example AI Workflow**:
```
Developer: "Help me implement DELETE endpoint"

AI reads:
- copilot-instructions.md → Knows to follow TDD
- patterns-discovered.md → Sees pattern for ID validation
- session-notes.md → Knows POST/PUT already implemented

AI suggests:
"Based on the pattern for ID validation in patterns-discovered.md,
let's start with the test for DELETE /api/todos/:id following TDD..."
```

## Best Practices

### DO ✅
- **Update scratch notes frequently** during active work
- **Summarize at end of session** into session-notes.md
- **Document patterns after 2nd occurrence** in patterns-discovered.md
- **Keep working notes informal** - they're for you
- **Make session summaries concise** - focus on key points
- **Include code examples** in pattern documentation

### DON'T ❌
- **Don't commit scratch/** - it's for active work only
- **Don't duplicate copilot-instructions.md** - that's for principles
- **Don't write novels** - keep notes actionable
- **Don't skip summarization** - working notes alone aren't enough
- **Don't document one-off issues** - only patterns that may recur

## Workflow Summary

```
┌─────────────────────────────────────────┐
│  Start Session                          │
│  └─ Open scratch/working-notes.md       │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  During Development                     │
│  ├─ Take notes in scratch/              │
│  ├─ Document decisions                  │
│  ├─ Track findings                      │
│  └─ Note blockers                       │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  End Session                            │
│  ├─ Summarize in session-notes.md       │
│  ├─ Add patterns to patterns-*.md       │
│  └─ Clear scratch/ for next session     │
└─────────────────────────────────────────┘
```

## Example Session Lifecycle

**Start of Session**:
```bash
# Open scratch notes
code .github/memory/scratch/working-notes.md

# Add current task
echo "## Current Task: Fix toggle functionality" >> working-notes.md
```

**During Work** (update scratch/working-notes.md):
```markdown
## Current Task: Fix toggle functionality

### Approach
- Review failing test
- Debug toggle function
- Implement fix

### Key Findings
- Test shows toggle always returns true
- Bug is in line 45: uses assignment instead of negation
- Fixed by changing to !todo.completed

### Decisions Made
- Keep existing API structure
- Add test for toggling false→true and true→false
```

**End of Session** (update committed files):

1. Add to `session-notes.md`:
```markdown
### Session: Toggle Bug Fix - Jan 22, 2025
Fixed toggle functionality bug where completed status always set to true.
Root cause: Assignment operator instead of negation.
Added bidirectional toggle tests.
```

2. Add to `patterns-discovered.md` (if pattern):
```markdown
## Boolean Toggle Pattern
**Context**: Toggling boolean state in API endpoints
**Problem**: State doesn't actually toggle
**Solution**: Use negation operator (!) not assignment
**Example**: `todo.completed = !todo.completed`
```

3. Clear or archive `scratch/working-notes.md` for next session

## Getting Started

1. **Read this file** to understand the system
2. **Start using scratch/working-notes.md** in your next session
3. **Summarize at end of session** into session-notes.md
4. **Build pattern library** as you discover recurring solutions
5. **Reference when asking AI** for context-aware help

## Remember

> "Memory is not just about recording what happened—it's about learning from
> it and applying those lessons to future work. Good memory systems make you
> faster and smarter over time."

Happy developing! 🚀
