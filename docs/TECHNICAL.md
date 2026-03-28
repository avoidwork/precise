# Technical Documentation

## Overview

`precise` is a nanosecond-precision timer for Node.js that leverages `process.hrtime.bigint()` for high-resolution time measurements. It is designed for performance-critical applications requiring accurate timing measurements.

## Architecture

### Core Implementation

The timer uses Node.js's `process.hrtime.bigint()` API, which returns the current high-resolution real time in nanoseconds as a `BigInt`. This provides nanosecond-level precision that is not affected by system clock adjustments.

```javascript
import { hrtime } from "node:process";
this.started = hrtime.bigint();  // Returns BigInt nanoseconds since epoch
```

### Mathematical Foundation

The precision of `precise` is based on the following mathematical principles:

**High-Resolution Time Base**
```
t = hrtime.bigint()  // Returns BigInt in nanoseconds (10^-9 seconds)
```

Unlike `Date.now()` which returns milliseconds (10^-3 seconds), `hrtime.bigint()` provides 6 decimal places of additional precision:
- `Date.now()`: ~1ms granularity (e.g., `1710000000123`)
- `hrtime.bigint()`: ~1ns granularity (e.g., `1710000000123456789n`)

**Time Delta Calculation**
```
Δt = t_stop - t_start
```

Where both `t_stop` and `t_start` are `BigInt` values representing nanoseconds. The subtraction is performed with full precision, and the result is converted to a JavaScript `number` for return.

**Unit Conversion**
```
nanoseconds → milliseconds: Δt_ms = ⌊Δt_ns / 10^6⌋
```

The conversion uses `BigInt` division to avoid floating-point precision issues:
```javascript
result = Number((this.stopped - this.started) / 1000000n);
```

**Precision Limits**
- JavaScript `number` type can safely represent integers up to `2^53 - 1` (≈9 petanoseconds)
- For typical use cases (< 285 years), `number` precision is sufficient
- `BigInt` arithmetic ensures no intermediate precision loss during delta calculation

### State Machine

The timer operates as a finite state machine with three primary states:

| State | `started` | `stopped` | Description |
|-------|-----------|-----------|-------------|
| Initial | `-1n` | `-1n` | Timer not started |
| Running | `bigint` | `-1n` | Timer started, not stopped |
| Stopped | `bigint` | `bigint` | Timer completed |

### Error Handling

The timer enforces state transitions through validation:

- **`start()`**: Throws if `started > -1n` (already started)
- **`stop()`**: Throws if `started === -1n` (not started) or `stopped > -1n` (already stopped)
- **`diff()`**: Throws if `started === -1n` (not started) or `stopped === -1n` (not stopped)
- **`elapsed()`**: Throws if `started === -1n` (not started)
- **`format()`**: Throws if `started === -1n` (not started)

## Data Types

### Nanosecond Precision

Internally, timestamps are stored as `BigInt` values to preserve nanosecond precision:

```javascript
this.started = hrtime.bigint();  // e.g., 1710000000000000000n
```

### Output Conversion

The `diff()` method converts the `BigInt` delta to a `number`:

```javascript
let result = Number(this.stopped - this.started);  // nanoseconds as number
if (ms) {
  result = Number((this.stopped - this.started) / 1000000n);  // milliseconds via BigInt division
}
```

**Note:** Converting to `number` may lose precision for very large values, but for typical use cases (sub-second to minute-scale measurements), this provides sufficient accuracy.

## Performance Characteristics

### Time Complexity

| Operation | Complexity |
|-----------|------------|
| `start()` | O(1) |
| `stop()` | O(1) |
| `diff()` | O(1) |
| `elapsed()` | O(1) |
| `format()` | O(1) |
| `reset()` | O(1) |

### Memory Usage

Each timer instance uses minimal memory:
- 3 private `BigInt` fields (`#started`, `#stopped`, `#delta`)
- No external dependencies or allocations

## Build System

### Tooling

- **Linter:** oxlint (Rust-based, extremely fast)
- **Formatter:** oxfmt (Rust-based code formatter)
- **Bundler:** Rollup for producing both CommonJS and ES module outputs
- **Test Runner:** Node.js native test runner (`node --test`)
- **Type Generation:** TypeScript compiler for `.d.ts` files

### Build Pipeline

```
src/precise.js → rollup → dist/precise.cjs + dist/precise.js
                              ↓
                        types/precise.d.ts
```

### Commands

```bash
npm run lint      # Run oxlint and oxfmt check
npm run fix       # Fix formatting with oxfmt and oxlint
npm test          # Run tests with coverage
npm run build     # Full build: lint, bundle, test
npm run types     # Generate TypeScript definitions
```

## Testing

### Coverage Requirements

The test suite maintains 100% code coverage across:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

### Test Structure

Tests use Node.js native test runner with async/await patterns:

```javascript
import { test } from "node:test";
import assert from "node:assert";

test("timer should return nanoseconds", async function () {
  const timer = precise().start();
  await new Promise(r => setTimeout(r, 100));
  timer.stop();
  assert.ok(timer.diff() > 0);
});
```

## Extension Points

### Class Inheritance

The `Precise` class is designed for extension:

```javascript
import { Precise } from "precise";

class MyTimer extends Precise {
  start() {
    console.log("Starting timer...");
    return super.start();
  }
}
```

### Factory Pattern

The `precise()` factory function provides a convenient way to create instances:

```javascript
import { precise } from "precise";
const timer = precise();  // Equivalent to new Precise()
```

## Dependencies

### Runtime

- **None** - Zero runtime dependencies

### Development

| Package | Purpose |
|---------|---------|
| oxlint | Fast Rust-based linter |
| oxfmt | Fast Rust-based formatter |
| rollup | Module bundler |
| typescript | Type definition generation |
| husky | Git hooks management |
| auto-changelog | Changelog generation |

## Platform Support

- **Node.js:** >= 10.7.0
- **Platforms:** All Node.js supported platforms (Linux, macOS, Windows)

## Licensing

BSD-3-Clause License

Copyright (c) 2026 Jason Mulligan
