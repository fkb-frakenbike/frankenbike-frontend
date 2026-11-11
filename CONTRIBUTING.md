# Contributing

Same flow as `frankenbike-backend`.

## Branches

| Branch | Role | Deploys to |
|---|---|---|
| `main` | Stable. Only ever receives `develop` through a release PR. Never target it from a work branch. | nothing today |
| `develop` | Integration branch. Everything on it must be shippable. | nothing today |
| `feature/FKB-<n>-short-name` | One change, cut from `develop`. | - |
| `hotfix/FKB-<n>-short-name` | Urgent fix: same as a feature branch, cut from `develop`. | - |

`main` and `develop` are protected: no direct push, no force push, CI (`checks`) must pass, and every PR is reviewed and validated by a maintainer before it is merged (the number of approvals is not enforced, because agents open PRs with a maintainer account).

There is no deployment yet: Vercel git deployments are off (`vercel.json`).

## Daily flow

1. `git switch develop && git pull`, then `git switch -c feature/FKB-<n>-short-name`.
2. Commit with Conventional Commits: `feat(FKB-73): add public routes`. Co-author lines are welcome.
3. Open a PR **to `develop`**. Keep it small and self-contained: one change, its tests, no hidden dependency on another open PR. A reviewer must be able to revert it alone.
4. **Squash merge** into `develop` (one commit per PR, so a revert is a single commit).

## Release (`develop` to `main`)

1. Open a PR `develop` -> `main` once `develop` is validated.
2. Merge it with a **merge commit**. Never squash it, never cherry-pick: both rewrite commit ids, `develop` and `main` then diverge and the next release conflicts.
3. To undo a release: `git revert -m 1 <merge-commit>`.
4. `main` never holds work that `develop` lacks. The only extra commit it carries is the release merge commit.

## Urgent fix (hotfix) and configuration changes

Everything goes through `develop`, including urgent fixes and pure configuration: branch from `develop`, PR to `develop`, squash merge, then release at once with a `develop` -> `main` PR.

## Testing

- Any change of behaviour (a service, a hook, a helper, a form rule, error handling) starts with a failing Jest test, then the minimum code to pass, then refactor. A bug fix starts with a test that reproduces it.
- Commit the failing test (`test: ...`) before the code that fixes it when practical.
- Exempt: documentation, pure configuration, markup or styling only, behaviour-neutral renames. No need to retrofit untouched legacy code.
- Tests live next to the code in `__tests__` folders (Jest, Testing Library). End-to-end tests (`tests/e2e`, Playwright) need the API and run by hand for now.

## Local checks (what CI runs)

Use the Node version in `.nvmrc` (the pre-commit hook runs `vercel build`, which needs it).

```bash
npm run lint && npm test && npm run build && npx tsc --noEmit
```

`tsc` runs after the build: the build generates the global `PageProps` type.

## PR checklist

- [ ] Base branch is `develop` (never `main`)
- [ ] One autonomous change; can be reverted alone
- [ ] Test written first (red, then green); CI green
- [ ] No secret or `.env` value committed
