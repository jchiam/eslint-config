# ESLint Config

[![npm](https://img.shields.io/npm/v/@jchiam/eslint-config.svg)](https://npmjs.org/package/@jchiam/eslint-config)

My personal shareable ESLint config. Targets TypeScript projects, with an optional React extension.

## Requirements

- ESLint 9 or 10
- `typescript-eslint` ^8
- `eslint-plugin-import-x` ^4.16

React projects additionally need:
- `eslint-plugin-react-hooks` ^7.1

## Usage

```sh
npm i -D @jchiam/eslint-config eslint typescript-eslint eslint-plugin-import-x
```

Create `eslint.config.js` in your project root:

```js
// eslint.config.js — TypeScript project
import jchiamConfig from '@jchiam/eslint-config';

export default [...jchiamConfig];
```

```js
// eslint.config.js — React + TypeScript project
import jchiamConfig from '@jchiam/eslint-config';
import jchiamReact from '@jchiam/eslint-config/react';

export default [...jchiamConfig, ...jchiamReact];
```

Override rules by appending a config object to the array:

```js
import jchiamConfig from '@jchiam/eslint-config';

export default [
  ...jchiamConfig,
  {
    rules: {
      'prefer-const': 'warn', // override to warn instead of error
    },
  },
];
```

## What's included

### `recommended.js`

- [`eslint:recommended`](https://eslint.org/docs/rules/) — ESLint core rules
- [`typescript-eslint`](https://typescript-eslint.io/) recommended rules
- [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) recommended + TypeScript settings (registered under the `import` namespace, so rules are still `import/...`)
- [`@stylistic/eslint-plugin`](https://eslint.style/) for formatting (indent, spacing, quotes, semi, etc.)
- Additional opinionated rules for best practices and ES6+

### `react.js`

Extends `recommended.js` intent with:
- [`@eslint-react/eslint-plugin`](https://github.com/Rel1cx/eslint-react) recommended rules (bundled — no separate install needed)
- [`eslint-plugin-react-hooks`](https://github.com/facebook/react) rules of hooks + exhaustive deps

## Breaking Changes

### v5 to v6

Replaced [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import) with its maintained fork [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x). The original plugin does not support ESLint 10 (it crashes at runtime under ESLint 10); `import-x` does, and is lighter and faster.

Swap the peer dependency:

```sh
npm uninstall eslint-plugin-import
npm i -D eslint-plugin-import-x
```

**This also unblocks ESLint 10** — you can now bump `eslint` to `^10`.

**Rule references are unchanged.** `import-x` is a drop-in fork with identical rule names, and this config registers it under the `import` namespace, so existing `import/...` rule overrides in your `eslint.config.js` keep working with no changes.

**One caveat — resolver/import *settings* renamed.** `import-x` reads its `settings` under an `import-x/` prefix. If your own config overrides import settings (e.g. a custom resolver), rename the keys:

```js
// Before
settings: { 'import/resolver': { /* ... */ } }
// After
settings: { 'import-x/resolver': { /* ... */ } }
```

React projects: `eslint-plugin-react-hooks` must be `^7.1` (earlier 7.x does not support ESLint 10). The bundled `@eslint-react/eslint-plugin` was also upgraded to v5 for ESLint 10 support — no install needed, but its recommended rule set has changed across that upgrade.

### v4 to v5

Migrated to [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) (required for ESLint 9+). The `.eslintrc` format is no longer supported.

**Note:** delete your existing `node_modules` and `package-lock.json` before reinstalling — the old lockfile pins conflicting major versions and will cause resolution errors.

Install the new peer dependencies:

```sh
npm i -D typescript-eslint
```

Remove the old peer dependencies (now bundled or renamed):

```sh
npm uninstall @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Config format changes from `.eslintrc.js`:

```js
// Before (.eslintrc.js)
module.exports = {
  extends: ['@jchiam/eslint-config/recommended'],
};
```

To `eslint.config.js`:

```js
// After
import jchiamConfig from '@jchiam/eslint-config';
export default [...jchiamConfig];
```

**Rule changes:**
- Formatting rules moved from ESLint core to `@stylistic/eslint-plugin` (same rules, prefixed with `@stylistic/`)
- `no-shadow` / `no-use-before-define` replaced by their `@typescript-eslint/*` equivalents (TS-aware, no false positives on type declarations)
- `no-new-object` renamed to `no-object-constructor`
- `vars-on-top` removed (redundant — `no-var` is enforced and `@typescript-eslint/no-use-before-define` covers the intent)
- `@typescript-eslint/indent` removed (was deprecated and broken; `@stylistic/indent` is used instead)

### v3 to v4

The original config file was split from `index.js` into `recommended.js` and `react.js` to allow non-React projects to use only the base config.

```js
// Before
{ "extends": "@jchiam" }

// After
{ "extends": ["@jchiam/eslint-config/recommended", "@jchiam/eslint-config/react"] }
```
