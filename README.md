# ESLint Config

[![npm](https://img.shields.io/npm/v/@jchiam/eslint-config.svg)](https://npmjs.org/package/@jchiam/eslint-config)

My personal shareable ESLint config. Targets TypeScript projects, with an optional React extension.

## Requirements

- ESLint 9 (ESLint 10 not yet supported due to `eslint-plugin-import` peer dep constraints)
- `typescript-eslint` ^8
- `eslint-plugin-import` ^2.29

React projects additionally need:
- `eslint-plugin-react` ^7.32
- `eslint-plugin-react-hooks` ^5

## Usage

```sh
npm i -D @jchiam/eslint-config eslint typescript-eslint eslint-plugin-import
```

Create `eslint.config.js` in your project root:

```js
// TypeScript project
const jchiamConfig = require('@jchiam/eslint-config');

module.exports = [...jchiamConfig];
```

```js
// React + TypeScript project
const jchiamConfig = require('@jchiam/eslint-config');
const jchiamReact = require('@jchiam/eslint-config/react');

module.exports = [...jchiamConfig, ...jchiamReact];
```

Override rules by appending a config object to the array:

```js
const jchiamConfig = require('@jchiam/eslint-config');

module.exports = [
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
- [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import) recommended + TypeScript resolver
- [`@stylistic/eslint-plugin`](https://eslint.style/) for formatting (indent, spacing, quotes, semi, etc.)
- Additional opinionated rules for best practices and ES6+

### `react.js`

Extends `recommended.js` intent with:
- [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) recommended (with `react/prop-types` off for TypeScript)
- [`eslint-plugin-react-hooks`](https://github.com/facebook/react) rules of hooks + exhaustive deps

## Breaking Changes

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
// Before
module.exports = {
  extends: ['@jchiam/eslint-config/recommended'],
};
```

To `eslint.config.js`:

```js
// After
const jchiamConfig = require('@jchiam/eslint-config');
module.exports = [...jchiamConfig];
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
