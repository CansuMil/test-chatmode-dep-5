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

## Boolean Toggle Pattern

**Context**: When implementing toggle functionality for boolean state in API endpoints or UI components

**Problem**: Toggle functionality always sets the boolean to the same value (usually `true`) instead of actually toggling between `true` and `false`. This happens when using assignment (`=`) instead of negation (`!`).

**Solution**: Use the negation operator (`!`) to flip the current boolean value, rather than assigning a static value.

**Example**:
```javascript
// ❌ Bad - Always sets to true
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  todo.completed = true;  // BUG: Always true, never toggles
  res.json(todo);
});

// ✅ Good - Properly toggles
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  todo.completed = !todo.completed;  // Toggles: false→true, true→false
  res.json(todo);
});
```

**Why This Matters**:
- Common bug in state management
- Easy to miss in code review
- Tests should verify both directions (false→true AND true→false)
- Affects user experience significantly (can't un-check items)

**Related Files**: 
- [packages/backend/src/app.js](../../packages/backend/src/app.js)
- [packages/backend/__tests__/app.test.js](../../packages/backend/__tests__/app.test.js)

**Tags**: `boolean`, `toggle`, `state-management`, `common-bug`

---

## REST API 404 Error Handling Pattern

**Context**: When implementing RESTful API endpoints that operate on specific resources by ID

**Problem**: Endpoints need to gracefully handle requests for non-existent resources. Without proper checks, code may throw runtime errors or return confusing responses.

**Solution**: Check if the resource exists before operating on it. Return a 404 status code with a descriptive error message if the resource is not found.

**Example**:
```javascript
// ❌ Bad - No existence check
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  todo.title = req.body.title;  // Will crash if todo is undefined
  res.json(todo);
});

// ✅ Good - Proper 404 handling
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todo.title = req.body.title;
  res.json(todo);
});

// ✅ Also good - For delete operations using findIndex
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.json({ message: 'Todo deleted successfully' });
});
```

**Why This Matters**:
- Provides clear feedback when resources don't exist
- Prevents runtime errors from undefined access
- Follows REST API conventions
- Improves API usability and debugging
- Required for passing comprehensive test suites

**Related Files**: 
- [packages/backend/src/app.js](../../packages/backend/src/app.js)
- [packages/backend/__tests__/app.test.js](../../packages/backend/__tests__/app.test.js)

**Tags**: `rest-api`, `error-handling`, `404`, `validation`, `best-practices`

---

## Input Validation Pattern

**Context**: When accepting user input in API endpoints, especially for required fields

**Problem**: Missing or invalid input can cause runtime errors, data corruption, or security issues. Need to validate input before processing.

**Solution**: Check for required fields and validate input format before creating or updating resources. Return 400 Bad Request with descriptive error messages for invalid input.

**Example**:
```javascript
// ❌ Bad - No validation
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: nextId++,
    title: req.body.title,  // Could be undefined or empty
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// ✅ Good - Proper validation
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  // Validate required field
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTodo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

**Why This Matters**:
- Prevents bad data from entering the system
- Provides clear feedback to API consumers
- Follows HTTP status code conventions (400 for client errors)
- Catches issues early before they cause bigger problems
- Essential for robust API design

**Related Files**: 
- [packages/backend/src/app.js](../../packages/backend/src/app.js)
- [packages/backend/__tests__/app.test.js](../../packages/backend/__tests__/app.test.js)

**Tags**: `validation`, `input-validation`, `400-error`, `rest-api`, `security`

---

<!-- Add new patterns above this line, with most recent first -->
