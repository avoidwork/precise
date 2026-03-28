# Contributing to precise

Thank you for your interest in contributing to `precise`! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

## Code of Conduct

Be respectful and inclusive. Treat all contributors with dignity and create a welcoming environment for everyone.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/precise.git
   cd precise
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Setup

### Prerequisites
- Node.js >= 14.6.0
- npm

### Project Structure
```
precise/
├── src/           # Source code
│   ├── precise.js # Main implementation
│   └── constants.js # Error message constants
├── tests/         # Test suite
│   └── precise_test.js
├── dist/          # Built files (generated)
├── types/         # TypeScript definitions (generated)
└── docs/          # Documentation
```

### Available Scripts
```bash
npm run lint      # Run oxlint and oxfmt check
npm run fix       # Fix formatting issues
npm test          # Run tests with coverage
npm run build     # Full build: lint, bundle, test
npm run types     # Generate TypeScript definitions
```

## Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Add tests for new functionality in `tests/precise_test.js`

4. Update documentation if needed:
   - `README.md` - Main documentation
   - `docs/API.md` - API reference
   - `docs/TECHNICAL.md` - Technical details
   - `docs/CODE_STYLE.md` - Code conventions

5. Run the full build to ensure everything passes:
   ```bash
   npm run build
   ```

## Testing

### Requirements
- All tests must pass
- 100% code coverage required
- New features must include tests

### Running Tests
```bash
npm test              # Run tests with coverage
npm run coverage      # Generate coverage report
```

### Writing Tests
- Use Node.js native test runner
- One test per logical behavior
- Use descriptive test names
- Test edge cases and error conditions

Example:
```javascript
test("Method - should throw when not started", () => {
  const timer = precise();
  assert.throws(() => timer.method(), Error, "Should throw NOT_STARTED error");
});
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process or auxiliary tool changes

### Examples
```
feat: add elapsed() method for running timer measurements

fix: correct millisecond conversion precision

docs: update API documentation with new format() parameter

refactor: extract format logic for better testability
```

## Pull Request Process

1. Ensure all tests pass: `npm run build`
2. Update documentation for any changes
3. Fill out the PR template
4. Link any related issues
5. Wait for review

### PR Checklist
- [ ] Tests pass with 100% coverage
- [ ] Code formatted with `oxfmt`
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Commit messages follow conventions

## Code Style

See [docs/CODE_STYLE.md](docs/CODE_STYLE.md) for detailed coding standards.

Key points:
- Use tabs for indentation
- Private fields with `#` prefix
- JSDoc for all classes and methods
- Guard clauses for error handling
- Method chaining support

## Questions?

If you have questions, please open an issue or ask in the discussion forum.

## License

By contributing, you agree that your contributions will be licensed under the BSD-3-Clause license.
