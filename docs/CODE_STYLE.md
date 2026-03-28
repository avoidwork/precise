# Code Style Guide

This document outlines the coding standards and conventions used in the `precise` codebase.

## Formatting

### Indentation
- Use **tabs** for indentation (configured in `.oxfmtrc.json`)
- No trailing whitespace

### Line Length
- No hard limit, but keep lines readable
- Break long expressions across multiple lines with proper indentation

### Spacing
- One blank line between logical blocks
- No blank lines within a method's core logic
- Space after keywords (`if`, `return`, etc.)
- No space before function parentheses

## Naming Conventions

### Classes
- Use `PascalCase` for class names
```javascript
export class Precise { }
```

### Functions & Methods
- Use `camelCase` for function and method names
```javascript
diff(ms = false) { }
elapsed(ms = false) { }
```

### Variables
- Use `camelCase` for local variables
```javascript
const elapsedMs = Number(elapsedNs / 1000000n);
const seconds = Math.floor(elapsedMs / 1000);
```

### Private Fields
- Use `#` prefix for private class fields
```javascript
#started;
#stopped;
#delta;
```

### Constants
- Use `UPPER_SNAKE_CASE` for exported constants
```javascript
export const STARTED = "Timer has been started";
```

## Documentation

### JSDoc Comments
- All classes, methods, and functions must have JSDoc docblocks
- Include `@param`, `@returns`, and `@throws` where applicable

```javascript
/**
 * Returns the time delta between start() and stop()
 * @param {boolean} [ms=false] - If true, returns milliseconds instead of nanoseconds
 * @returns {number} Time delta in nanoseconds or milliseconds
 * @throws {Error} If timer has not been started or stopped
 */
diff(ms = false) { }
```

### Class Documentation
- Brief description of purpose
- Mark with `@class`

```javascript
/**
 * High-precision timer using process.hrtime.bigint()
 * @class
 */
export class Precise { }
```

## Code Structure

### Imports
- Group imports: Node.js built-ins first, then local imports
- Use ES module syntax

```javascript
import { hrtime } from "node:process";
import { BIG_INT_NEG_1 } from "./constants.js";
```

### Exports
- Use named exports for classes and functions
- Export at module level, not nested

```javascript
export class Precise { }
export function precise() { }
```

### Method Organization
- Constructor first
- Public methods in logical order (diff, elapsed, format, reset, start, stop)
- Group related methods together

## Error Handling

### Guard Clauses
- Validate inputs and state at method start
- Throw early with descriptive error messages

```javascript
if (this.#started === BIG_INT_NEG_1) {
  throw new Error(NOT_STARTED);
}
```

### Error Messages
- Use predefined constants for error messages
- Messages should describe the invalid state

```javascript
export const NOT_STARTED = "Timer has not been started";
```

## Data Types

### BigInt Usage
- Use `BigInt` for nanosecond timestamps
- Always use `n` suffix for BigInt literals
- Use `Number()` for conversion when returning

```javascript
this.#started = hrtime.bigint();
const delta = now - this.#started;
return Number(delta);
```

### Optional Parameters
- Use default values for optional parameters
- Document as optional with `[param=default]` syntax

```javascript
format(ms = false, delta) { }
```

## Control Flow

### Conditionals
- Use `if` statements with braces for all blocks
- Prefer early returns/throws over nested conditionals

```javascript
if (condition) {
  throw new Error(MESSAGE);
}
```

### Ternary Operators
- Use for simple conditional assignments
- Break across lines for complex expressions

```javascript
return ms ? Number(result / 1000000n) : Number(result);
```

### Loops
- Prefer `for...of` or array methods over traditional `for` loops
- Use `forEach` for side effects, `map`/`filter` for transformations

## Method Chaining

### Return `this`
- Methods that modify state should return `this` for chaining

```javascript
start() {
  this.#started = hrtime.bigint();
  return this;
}
```

### Chainable Pattern
- Enable method chaining: `precise().start().stop().diff()`

## Testing

### Test Structure
- Use Node.js native test runner
- One test per logical behavior
- Use descriptive test names

```javascript
test("Format - works with delta even if not started", () => {
  // Test implementation
});
```

### Assertions
- Use `assert.strictEqual` for equality
- Use `assert.ok` for truthiness
- Include descriptive messages

```javascript
assert.ok(result.includes("1h"), "Should include 1h");
```

## Review Checklist

Before submitting code, verify:
- [ ] All functions/classes have JSDoc
- [ ] Private fields use `#` prefix
- [ ] Error handling uses guard clauses
- [ ] Methods return `this` when appropriate
- [ ] No console.log statements
- [ ] Tests pass with 100% coverage
- [ ] Code is formatted with oxfmt
- [ ] No linting errors with oxlint
