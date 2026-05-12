# AGENTS.md

Rules and principles for agents working on **this** project.

---

## 1. Core Rules

### 1.0 Document Conventions

When updating this document, append new information or sections. Do NOT delete or overwrite existing content unless explicitly directed. Always ask before making structural changes. When in doubt, keep it.

### 1.1 Forbidden Patterns

The following are **strictly prohibited**:

- Hardcoded secrets, API keys, or credentials.
- `console.log()` statements in production code (use a `console` abstraction / logger instead).
- `eval()`, `Function()`, `setTimeout` with string arguments at any level.
- Wildcard imports (`import * as`).
- Mutating a list while iterating over it.
- Blocking I/O (`fs.readFileSync`, `crypto.randomBytes` with large data) inside event loop / async functions.
- Bypassing the auth middleware.

### 1.2 Security Rules

Follow the [OWASP Top 10](https://owasp.org/www-project-top-10/) for every piece of code written:

- Every route MUST pass through authentication middleware.
- Never store plaintext secrets. Use `process.env`.
- Use parameterized queries. Validate and sanitize all user input.
- File uploads must pass whitelist + MIME validation.
- All defaults must be production-safe. No `DEBUG=true` in non-local configs.
- Implement secure token verification. Reject tokens with weak algorithms.
- Log at structured JSON level. Strip PII before logging.
- Validate all outbound tool URLs against an allowlist. Disallow `file://`, `gopher://`, `dict://` schemes.

### 1.3 Git Operations

- **Never rebase under any circumstance without explicit agreement from the user.** Never assume your decision is correct.
- **Never push to any branch without explicit user approval.** Git changes (checkout, reset, revert, amend) are local operations — do not auto-push. Always ask "Push to remote?" before running `git push`.
- Never force push.

### 1.4 Core Principles

- **DRY**: Extract repeated logic into functions, classes, or utilities. Centralize configuration in constants. Reuse formatters and utilities. No copy-paste code blocks greater than three lines.
- **KISS**: Prefer simple, readable code over clever solutions. If a solution requires more than three levels of indentation or a helper function with more than 10 lines, reconsider it.
- **YAGNI**: Do NOT build features, abstractions, or configurations not required by the current spec. No generic "future-proof" wrappers. Ad-hoc solutions are acceptable as long as they serve a present requirement.
- **Single Responsibility**: Each module, class, and function must have one reason to change.
- **Open/Closed**: Extend via composition — not by modifying existing logic.
- **Dependency Inversion**: Depend on abstractions (protocols / interfaces) for external services. Inject implementations.

---

## 2. Project Context

`precise` is a nanosecond-precision timer library for Node.js using `process.hrtime.bigint()`.

### 2.0 Expected Project Layout

```
├── dist/
│   ├── precise.cjs          # CommonJS bundle
│   └── precise.js           # ES module bundle
├── docs/
│   ├── TECHICAL.md          # Technical architecture documentation
│   └── CODE_STYLE.md        # Code style conventions
├── src/
│   ├── constants.js         # Shared constants (BIG_INT_NEG_1, error messages)
│   └── precise.js           # Main Precise class + factory function
├── tests/                   # Tests mirror source structure
│   ├── test_constants.js
│   ├── test_precise.js
│   └── test_helpers.js
├── types/
│   └── precise.d.ts         # TypeScript type definitions
├── package.json
├── rollup.config.js
├── .oxfmtrc.json
├── .eslintrc.json
└── AGENTS.md
```

Misc details: Zero runtime dependencies. Compatible with Node.js >= 10.7.0.

### 2.1 Quick Commands

| Command             | Purpose                         |
|---------------------|---------------------------------|
| `npm run lint`      | Run oxlint and oxfmt check      |
| `npm run fix`       | Fix formatting with oxfmt       |
| `npm test`          | Run tests with coverage         |
| `npm run build`     | Full build: lint, bundle, test  |
| `npm run types`     | Generate TypeScript definitions |

---

## 3. JavaScript / Node.js Conventions

### 3.1 Language & Tooling

- **Node.js**: >= 10.7.0 (ES modules via `.js` extension)
- **Package manager**: `npm`
- **Type checking**: TypeScript compiler for `.d.ts` generation
- **Formatting**: `oxfmt` (Rust-based, configured via `.oxfmtrc.json`)
- **Linting**: `oxlint` (Rust-based, configured via `.eslintrc.json`)
- **Bundling**: Rollup for CommonJS + ES module outputs
- **Testing**: Node.js native test runner (`node --test`)
- **Git hooks**: `husky`

### 3.2 Style

- Use **tabs** for indentation. No spaces.
- Follow the [Code Style Guide](docs/CODE_STYLE.md).
- All classes, methods, and functions MUST have JSDoc docblocks with `@param`, `@returns`, `@throws` where applicable.
- Private fields use `#` prefix.
- Naming: `PascalCase` for classes, `camelCase` for functions/methods/variables, `UPPER_SNAKE_CASE` for constants.

### 3.3 Error Handling

- Use early guard clauses — validate inputs and state at the start of each method.
- Throw with descriptive error messages backed by constant strings in `constants.js`.
- Never swallow errors silently.

```javascript
if (this.#started === BIG_INT_NEG_1) {
  throw new Error(NOT_STARTED);
}
```

### 3.4 BigInt

- Use `BigInt` for nanosecond timestamps — it preserves precision without floating-point issues.
- Always use the `n` suffix for BigInt literals.
- Convert to `number` with `Number()` only when returning results.

```javascript
this.#started = hrtime.bigint();  // e.g., 1710000000000000000n
const delta = now - this.#started;
return Number(delta);
```

### 3.5 Testing

- Use the **Node.js native test runner** — no external test framework required.
- Test files mirror the source directory structure with `test_` prefix.

```javascript
import { test } from "node:test";
import assert from "node:assert";
import { Precise } from "../src/precise.js";

test("timer diff returns nanoseconds", () => {
  const timer = new Precise().start();
  timer.stop();
  assert.ok(timer.diff() >= 0);
});
```

- Each public method or class must have at least one test.
- Tests must pass with **100% code coverage** (statement, branch, function, line).

```javascript
import { Precise } from "../src/precise.js";

test("timer diff returns nanoseconds", () => {
  const timer = new Precise().start();
  timer.stop();
  assert.ok(timer.diff() >= 0);
});
```

---

## 4. Framework Conventions

### 4.1 Module Pattern

- Use ES module syntax (`import` / `export`) throughout.
- Group imports: Node.js built-ins first, then local imports.

```javascript
import { hrtime } from "node:process";
import { BIG_INT_NEG_1 } from "./constants.js";
```

- Use named exports at module level — never nested.

```javascript
export class Precise { }
export function precise() { }
```

### 4.2 Class Design

- The `Precise` class is the core — designed for inheritance.
- Use private class fields with `#` prefix (`#started`, `#stopped`, `#delta`).
- Methods that modify state should return `this` to enable chaining.

```javascript
class MyTimer extends Precise {
  start() {
    console.log("Starting timer...");
    return super.start();
  }
}
```

### 4.3 Factory Pattern

The `precise()` factory provides a convenience constructor:

```javascript
const timer = precise();  // Equivalent to new Precise()
```

---

## 5. Git Conventions

### 5.1 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add timer class inheritance support
fix: correctBigInt overflow in diff() conversion
docs: update AGENTS.md with JavaScript conventions
test: add coverage for elapsed() with negative delta
chore: pin dev dependencies in package.json
```

### 5.2 Branching

- Main branch is `main`.
- Feature branches: `feat/<short-desc>` or `fix/<short-desc>`.
- Never commit directly to `main`. Always create a feature branch first, then open a PR targeting `main`.

### 5.2.1 Agent Workflow

When auditing or modifying AGENTS.md (or any file):
1. Create a feature branch: `git checkout -b docs/<short-desc>` (or `feat/`, `fix/`).
2. Make changes and commit on the feature branch.
3. Push the feature branch and open a PR with `gh pr create --base main`.
4. Never commit or push directly to `main` or `master`.

### 5.3 Code Review

- All changes require at least one other reviewer (automated checks are mandatory but not sufficient).
- No merging without passing CI (lint → type-check → test).
- PR descriptions must reference related items from design documents.

### 5.4 Pull Request Templates

If a `.github/PULL_REQUEST_TEMPLATE.md` file exists, it MUST be used when creating PRs. Fill out every section — do not leave any section blank. If a section does not apply, write `N/A` rather than skipping it.

---

## 6. Operational Rules

Session learnings — critical gotchas that affect how code must be written and tested.

### 6.1 Coverage

The pre-commit hook enforces **100% code coverage**. Every new function or class needs test coverage. No exceptions.

```bash
npm test                          # Run tests with coverage
node --test --experimental-test-coverage  # Verify coverage reports
```

### 6.2 Pre-commit Hook and coverage.txt

The pre-commit hook runs tests then regenerates `coverage.txt`. If the hook modifies a staged file, `git commit` fails. Always `git add -A` and `git commit --amend -C HEAD` after a failed commit from a modified `coverage.txt`.

### 6.3 Pre-commit Runs Tests

The pre-commit hook runs `npm test` in addition to linting/type-checking (oxlint, oxfmt). A commit can fail due to test failures or insufficient coverage, not just lint or formatting.

### 6.4 Mocking in Node.js Native Tests

The Node.js native test runner doesn't require a mocking library for simple use cases. When mocking is needed:

- Create a mock module via `node:test`'s `Mock` API or use module path overrides.
- Mock entire objects rather than using partial mocks.

```javascript
// Wrong: partial mock of process.hrtime
const original = hrtime;
hrtime.bigint = () => mockValue;

// Right: replace the entire imported module
const mockModule = await import("node:process");
// Use import assertions or dynamic imports to swap the module entirely
```

### 6.5 BigInt Precision Gotchas

`BigInt` is not a `number` — it cannot be mixed in arithmetic. Always use explicit `Number()` conversion at the boundary:

```javascript
// Wrong - TypeError: can't convert BigInt to number
const total = bigIntValue + otherBigIntValue;

// Correct - convert only at the return boundary
return Number(stopped - started);
```

### 6.6 Unreachable Code

Code that can never execute is a smell. Remove dead code to avoid coverage gaps and confusion.

---

## 7. Session Learnings

Discovery notes about the codebase.

### 7.1 README is the source of truth for project layout

The `README.md` may show a more up-to-date project structure (e.g., additional tool files, output formats). When in doubt, use it to verify the layout in section 2.0.

---

## 8. Checklist Before Marking a TODO Complete

- [ ] All classes/methods have JSDoc docblocks with `@param`, `@returns`, `@throws`.
- [ ] Private fields use `#` prefix.
- [ ] Method names follow `camelCase`; classes follow `PascalCase`; constants follow `UPPER_SNAKE_CASE`.
- [ ] Unit tests written and passing.
- [ ] Tests pass with 100% code coverage (statement, branch, function, line).
- [ ] `oxlint` and `oxfmt` pass via pre-commit hooks.
- [ ] TypeScript definitions generated and in sync with implementation.
- [ ] No hardcoded secrets or credentials introduced.
- [ ] Environment variable configuration used (no config file logic).
- [ ] 100% code coverage maintained (pre-commit will enforce this).
- [ ] No `console.log` statements in production code.
- [ ] Threat model considerations addressed in PR description.
