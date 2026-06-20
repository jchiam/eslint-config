# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@jchiam/eslint-config` is a shareable **ESLint flat config** published to npm. It has no source build — the two config files (`recommended.js`, `react.js`) are shipped as-is (see the `files` array in `package.json`). Both export a flat-config array of config objects.

## Architecture

- **`recommended.js`** — the default/`main` export. Base config for any TypeScript project. Composes `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-import-x` (recommended + typescript settings, re-registered under the `import` namespace so rules stay `import/...`; resolver settings use the `import-x/` prefix), and an opinionated rule block: TS rules, best-practice rules, ES6+ rules, and all formatting rules via `@stylistic/eslint-plugin`.
- **`react.js`** — the `/react` subpath export. **Self-contained**: it spreads `recommended.js` first, then adds `@eslint-react/eslint-plugin` recommended, `eslint-plugin-react-hooks`, and JSX stylistic rules. React consumers spread a single array (`[...jchiamReact]`); they must *not* also spread `recommended` or the base is included twice. The ordering invariant (base before the React layer) lives here, not in consumer config.

### Dependency boundaries (important when editing rules)

- **Bundled** (`dependencies`, no consumer install): `@eslint-react/eslint-plugin`, `@eslint/js`, `@stylistic/eslint-plugin`, `globals`.
- **Peer** (consumer must install): `eslint`, `eslint-plugin-import-x`, `typescript-eslint`. `eslint-plugin-jest` and `eslint-plugin-react-hooks` are *optional* peers.
- A plugin imported in a config file must be either a bundled dep or a (non-optional) peer the consumer is guaranteed to have. `@stylistic` is re-declared in `react.js`'s `plugins` block because flat-config plugin registrations are per-config-object, not global.

### Conventions baked into the rules (don't fight these)

- 2-space indent, single quotes, semicolons, trailing commas, `as-needed` arrow parens, `1tbs` brace style.
- `func-style: declaration` with arrow functions allowed; `prefer-destructuring` for objects only.
- TS-aware variants replace base rules: `@typescript-eslint/no-shadow` and `no-use-before-define` are enabled while the base `no-shadow`/`no-use-before-define` are turned off. Preserve this pairing.
- `@typescript-eslint/array-type` uses `generic` (`Array<T>`, not `T[]`).

## Validating changes

There is **no build**. `npm test` runs `node --test` (Node's built-in runner, no framework dependency) over `test/`.

`test/rules.test.js` is the **behavioural test surface**: it lints small fixtures through the real config arrays with ESLint's `Linter` and asserts the emitted rule-ids. Scope is deliberate — only the *opinionated* choices (rules set beyond upstream defaults) and the fragile base/TS-aware pairings (`no-shadow`, `no-use-before-define`), where a silent regression is most likely and most invisible. Upstream plugin defaults are not re-tested. Fixtures carry incidental violations, so assertions check a rule-id is *present* (`fires`) or *absent* (`silent`), never an exact message set.

When adding or changing an opinionated rule, add a fixture. To confirm a fixture actually bites, mutate the rule in the config and check the test goes red.

CI (`.github/workflows/ci.yml`) runs `npm test` on Node 20, 22, and 24. The suite's last test subsumes the old array-shape check.

## Releasing

Publishing is automated: creating a **GitHub Release** triggers `.github/workflows/publish.yml`, which runs `npm publish --provenance`. Do not `npm publish` manually. Bump the version in `package.json` (history shows version bumps as their own commits, e.g. `5.1.1`), then cut a release.

When changing rules or peer/bundled dependencies, update the **"What's included"** and **"Breaking Changes"** sections of `README.md` — they are the consumer-facing contract, and major-version bumps document migrations there.
