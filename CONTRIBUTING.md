Thank you for your interest in making Spline better _(seriously, thank you!)_.

This guide covers the coding standards and pull request requirements.

For setting up a development environment, check [the README.md's pre-requisites and getting started](./README.md#prerequisites).

## AI-assisted contributions

We allow AI assistance in most of the codebase, but not everywhere. The goal is simple: whoever submits code must understand it and be able to defend it, and code that touches confidential data must be written by a human.

### Protected paths (human-written only)

AI tools must not be used to write or modify code in these areas:

- `packages/auth/**`
- `packages/db/**`
- `packages/logger/**`
- Any code handling sessions, tokens, credentials, encryption, permissions or workspace authorization.

### Everywhere else

AI assistance (including autocomplete, chat assistants and agents) is allowed for parts of the backend that don't fall under the protected paths, UI, tooling, tests and documentation, provided that:

1. **You disclose it.** Add an "AI-assisted" warning to the PR description, and name the tool and model used.
2. **You understand every line.** You must be able to explain and justify your change during review. "The AI wrote it" is not an answer.
3. **You have tested it.** Run the test suite and verify behavior yourself.
4. **You vetted new dependencies.** Check that each package exists, is maintained and is necessary. Dependencies suggested by an AI tool need extra scrutiny.
5. **You leaked nothing.** Do not paste secrets, real user data or private code into third-party AI tools.
6. **You are responsible.** You are responsible for any issues that arise in the codebase. If an AI tool causes a bug or a security issue, you are responsible for fixing it.

### What counts as AI assistance

Basic editor features (syntax completion, formatting, linting) do not need disclosure. Anything that generates logic, tests, documentation text or refactors does.

### Consequences

PRs that violate these rules (undisclosed AI use, changes to protected paths written with AI) will be closed. Repeated violations may lead to the contributor being banned from the repository.

## Pull Requests

- For feature requests, create an issue before making a Pull Request until a maintainer approves the request.
- Keep them in draft until they've ran through our pre-submition checks.
- Related issues must be referenced with "Closes #issuenumber".
- Breaking changes must be mentionned.
- All required CI checks must pass.
- Relevant tests must be added or updated.
- Changes should be focused.

## Commit messages

Spline uses short, human-readable commit messages.

Commit messages should:

- Start with a capital letter.
- Briefly describe what the commit does.
- Use imperative wording where practical.
- Avoid unnecessary prefixes, scopes, or issue numbers.

Examples:

- `Add GitHub issue integration`
- `Fix authentication redirect`
- `Update database schema`
- `Improve workspace navigation`
- `Remove unused dependencies`

## Branch naming

Use descriptive branch names following the `type/short-description` format.

Supported prefixes:

- `feature/`: New functionality
- `fix/`: Bug fixes
- `refactor/`: Code restructuring
- `docs/`: Documentation changes
- `chore/`: Maintenance and tooling

Use lowercase words separated by hyphens.

Examples:

- `feature/github-integration`
- `fix/login-redirect`
- `refactor/api-client`
- `docs/contributing-guide`
- `chore/update-dependencies`

## Potentially useful scripts

- `pnpm dev[:web, :server]`: Runs a development server (use `:web` or `:server` to start each server independently)
- `pnpm test`: Runs tests
- `pnpm lint[:fix]`: Checks all problems with lint rules, and fixes them if asked
- `pnpm format[:check]`: Formats all files or simply checks which files are missing formatting
- `pnpm typecheck`: Checks all TypeScript types

## Before submitting changes

Run the following scripts:

```bash
pnpm lint:fix
pnpm format
pnpm typecheck
pnpm test
```

If they fail, fix the issue.

Finally, see if the CI checks pass.

## Issues

Report all bugs through issues, using the pre-made issue template, before making a bugfix pull request.

## License

All changes are licensed accordingly to [LICENSE](./LICENSE).
