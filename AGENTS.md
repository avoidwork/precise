# precise

Nanosecond-precision timer for Node.js using `process.hrtime.bigint()`.

## Tools & Dependencies

- **Linter:** oxlint
- **Formatter:** oxfmt
- **Test Runner:** Node.js native test runner (`node --test`)
- **Code Coverage:** `node --experimental-test-coverage --test`

## Project Structure

- `src/precise.js` - Main source file with `Precise` class and `precise()` factory
- `src/constants.js` - Error message constants
- `test/precise_test.js` - Test suite
- `dist/precise.cjs` - Built CommonJS output
- `dist/precise.js` - Built ES module output

## API

### `precise()` (Factory function)
Returns a new `Precise` instance.

### `new Precise()` (Class)
Creates a timer instance with the following methods:

- **`start()`** - Starts the timer. Returns `this` for chaining. Throws if already started.
- **`stop()`** - Stops the timer. Returns `this` for chaining. Throws if not started or already stopped.
- **`diff(ms = false)`** - Returns time delta between start and stop in nanoseconds. Pass `true` for milliseconds. Throws if not started or not stopped.
- **`reset()`** - Resets the timer to initial state. Returns `this` for chaining.

### State Tracking
- `started` - Nanosecond timestamp when started (or `-1n` if not started)
- `stopped` - Nanosecond timestamp when stopped (or `-1n` if not stopped)

## Commands

```bash
npm run lint      # Run oxlint and oxfmt check
npm run fix       # Fix formatting issues
npm test          # Run tests with coverage
npm run build     # Lint, build, and test
```

## Development Notes

- Uses Node.js native test runner with async/await (no `describe`/`it`)
- 100% code coverage required
- All functions and classes must have JSDoc docblocks
- Extensible via class inheritance: `class MyTimer extends Precise {}`
