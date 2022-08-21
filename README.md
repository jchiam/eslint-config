# ESLint Config

[![npm](https://img.shields.io/npm/v/@jchiam/eslint-config.svg)](https://npmjs.org/package/@jchiam/eslint-config)

This is a shareable eslint config.

## Usage

```
npm i -D @jchiam/eslint-config
```

Add `.eslintrc` to project.
```javascript
{
  "extends": [
    "@jchiam/eslint-config/recommended",
    "@jchiam/eslint-config/react"
  ]
  "rules": {}
}
```

Override rules as needed in local `.eslintrc`.

## Breaking Changes

### v3 to v4

The original config file has been split from `index.js` to `recommended.js` and `react.js`. Extending both config files is equivalent to the original usage. This was done to allow for non-React projects to extend only the base config file to avoid any React-related warnings from ESLint.

From:
```javascript
{
  "extends": "@jchiam",
  "rules": {}
}
```

To:
```javascript
{
  "extends": [
    "@jchiam/eslint-config/recommended",
    "@jchiam/eslint-config/react"
  ]
  "rules": {}
}
```
