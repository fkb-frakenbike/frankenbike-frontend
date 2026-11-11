# Instructions for coding agents

Read [CONTRIBUTING.md](CONTRIBUTING.md) first: branches, PR size, release flow. This file adds the rules agents must follow.

## TDD for behaviour changes

1. Any change of behaviour (service, hook, helper, form rule, error handling) starts with a failing Jest test.
2. Run it and read the failure: it must fail for the expected reason. Then write the minimum code to make it pass, then refactor.
3. A bug fix starts with a test that reproduces the bug (red), then the fix (green).
4. Commit the failing test (`test: ...`) before the code that makes it pass, when practical.
5. Exempt: documentation, pure configuration, markup or styling only, behaviour-neutral renames.
6. Do not retrofit tests on untouched legacy code; test what you change.
7. Run `npm run lint && npm test && npm run build && npx tsc --noEmit` before opening a PR; CI must be green.

## Working rules

- One autonomous change per PR, revertable alone. Base branch: always `develop`, including hotfixes and configuration changes. Never open a PR to `main` from a work branch.
- Never commit secrets or `.env` values. Never push to `main` or `develop` directly.
- Do not use cherry-pick to move work between `develop` and `main`.
- Use the Node version of `.nvmrc`. Never bypass the pre-commit hook with `--no-verify`.
- The front follows the API contract (the backend is the source of authority): write requests send `X-Requested-With: fkb` (see `app/lib/axios.ts`), ids are UUID v7 strings, and the session lives in cookies (`credentials: 'include'`, no Authorization header).
