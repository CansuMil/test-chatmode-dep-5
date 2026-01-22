# Patterns Discovered

## Purpose

This file catalogs **recurring code patterns and solutions** discovered during development. When you encounter a problem more than once, document it here so you (and AI assistants) can reference the solution in the future.

## Pattern Template

Use this template when documenting a new pattern:

```markdown
## [Pattern Name]

**Context**: [When/where this pattern applies]

**Problem**: [What issue does this solve?]

**Solution**: [How to implement the solution]

**Example**:
```language
// Code example showing the pattern
```

**Related Files**: [Links to files where this pattern is used]

**Tags**: [Relevant keywords for searching]

---
```

## Discovered Patterns

## Service Initialization Pattern

**Context**: When initializing in-memory data stores or service state in Express.js applications

**Problem**: Uninitialized or null arrays/objects cause "Cannot read property" errors when attempting to use array methods like `.map()`, `.filter()`, or `.find()`

**Solution**: Always initialize collections as empty arrays `[]` or empty objects `{}` rather than leaving them `undefined` or `null`. For services with ID generation, initialize the counter at `1`.

**Example**:
```javascript
// ❌ Bad - Uninitialized or null
let todos;  // undefined
let todos = null;

// ✅ Good - Properly initialized
let todos = [];
let nextId = 1;

// Usage
app.get('/api/todos', (req, res) => {
  res.json(todos);  // Works even when empty
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: nextId++,
    title: req.body.title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  res.status(201).json(todo);
});
```

**Why This Matters**:
- Tests expect arrays/objects to exist from the start
- Avoids runtime errors when calling array methods on undefined
- Makes code more predictable and easier to debug
- Follows principle of "fail fast with clear errors"

**Related Files**: 
- [packages/backend/src/app.js](../../packages/backend/src/app.js)
- [packages/backend/__tests__/app.test.js](../../packages/backend/__tests__/app.test.js)

**Tags**: `initialization`, `backend`, `in-memory-storage`, `arrays`

---

<!-- Add new patterns above this line, with most recent first -->
