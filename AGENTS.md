Read CONTRIBUTING.md in full before making any change. It contains the project's rules, including the AI policy.

## Hard rule: protected paths

Do NOT create, modify, rename or delete any file under the protected paths listed below. Do not propose patches for them either. These areas handle confidential user data and must be written and reviewed by humans.

- `packages/auth/**`
- `packages/db/**`
- Any code that handles sessions, tokens, credentials, encryption, permissions or workspace authorization
  If a task requires touching a protected path, stop and tell the user that a human contributor must make that change.

## Elsewhere

You may assist with other code (backend parts not under the protected paths, UI, tooling, tests, docs), but:

- Do not add dependencies without the user explicitly approving each one. Verify that a package exists and is maintained before suggesting it.
- Never log, print or hard-code user data, secrets or tokens.
- Tell the user their change should be disclosed as AI-assisted in the pull request (see CONTRIBUTING.md).
