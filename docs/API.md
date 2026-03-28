# API Documentation

## `Precise` Class

A high-precision timer using `process.hrtime.bigint()` for nanosecond-level accuracy.

### Constructor

```javascript
const timer = new Precise();
```

Creates a new timer instance in the initial state (not started, not stopped).

### Properties

- **`started`** (`bigint`) - Nanosecond timestamp when `start()` was called, or `-1n` if not started
- **`stopped`** (`bigint`) - Nanosecond timestamp when `stop()` was called, or `-1n` if not stopped

### Methods

#### `start()`

Starts the timer.

```javascript
const timer = new Precise().start();
```

- **Returns:** `Precise` - Returns `this` for method chaining
- **Throws:** `Error` if the timer has already been started

#### `stop()`

Stops the timer.

```javascript
timer.stop();
```

- **Returns:** `Precise` - Returns `this` for method chaining
- **Throws:** `Error` if the timer has not been started or has already been stopped

#### `diff(ms = false)`

Returns the time delta between `start()` and `stop()`.

```javascript
const nanoseconds = timer.diff();      // nanoseconds
const milliseconds = timer.diff(true); // milliseconds
```

- **Parameters:**
  - `ms` (`boolean`, optional, default: `false`) - If `true`, returns milliseconds instead of nanoseconds
- **Returns:** `number` - Time delta in nanoseconds or milliseconds
- **Throws:** `Error` if the timer has not been started or stopped

#### `reset()`

Resets the timer to its initial state.

```javascript
timer.reset();
```

- **Returns:** `Precise` - Returns `this` for method chaining

---

## `precise()` Factory Function

Creates a new `Precise` timer instance.

```javascript
import { precise } from 'precise';

const timer = precise().start();
setTimeout(() => console.log(timer.stop().diff()), 1000);
```

- **Returns:** `Precise` - New timer instance

---

## Usage Examples

### Basic Usage

```javascript
import { precise } from 'precise';

const timer = precise().start();
// ... do something ...
timer.stop();
console.log(`Elapsed: ${timer.diff()} nanoseconds`);
console.log(`Elapsed: ${timer.diff(true)} milliseconds`);
```

### Method Chaining

```javascript
import { precise } from 'precise';

const result = precise()
  .start()
  // ... do something ...
  .stop()
  .diff();
```

### Class Extension

```javascript
import { Precise } from 'precise';

class MyTimer extends Precise {
  // Extend with custom functionality
}

const timer = new MyTimer().start();
```

---

## Error States

The timer throws errors in the following situations:

| Method | Condition | Error |
|--------|-----------|-------|
| `start()` | Already started | "Timer has already been started" |
| `stop()` | Not started | "Timer has not been started" |
| `stop()` | Already stopped | "Timer has already been stopped" |
| `diff()` | Not started | "Timer has not been started" |
| `diff()` | Not stopped | "Timer has not been stopped" |
