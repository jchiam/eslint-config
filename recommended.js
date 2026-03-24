const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const stylistic = require('@stylistic/eslint-plugin');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.es2020,
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-use-before-define': 'error',

      // Disable base rules superseded by TypeScript equivalents
      'no-shadow': 'off',
      'no-use-before-define': 'off',

      // Best practice rules
      'camelcase': 'error',
      'eqeqeq': ['error', 'smart'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'max-depth': 'warn',
      'max-lines': ['warn', { skipBlankLines: true, skipComments: true }],
      'no-bitwise': 'error',
      'no-continue': 'error',
      'no-else-return': 'warn',
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error',
      'no-object-constructor': 'error',
      'no-unneeded-ternary': 'error',
      'operator-assignment': 'error',
      'prefer-object-spread': 'error',

      // ES6+ rules
      'no-duplicate-imports': 'error',
      'no-useless-computed-key': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': ['error', { array: false, object: true }],
      'prefer-numeric-literals': 'error',
      'prefer-template': 'error',

      // Formatting (via @stylistic/eslint-plugin)
      '@stylistic/array-bracket-spacing': 'error',
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': 'error',
      '@stylistic/comma-spacing': 'error',
      '@stylistic/comma-style': 'error',
      '@stylistic/computed-property-spacing': 'error',
      '@stylistic/eol-last': 'error',
      '@stylistic/func-call-spacing': 'error',
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/key-spacing': 'error',
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/lines-around-comment': ['error', { beforeBlockComment: true, allowBlockStart: true }],
      '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
      '@stylistic/no-multiple-empty-lines': 'error',
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/nonblock-statement-body-position': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/operator-linebreak': ['error', 'after'],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/rest-spread-spacing': 'error',
      '@stylistic/semi': 'error',
      '@stylistic/semi-style': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      '@stylistic/space-in-parens': 'error',
      '@stylistic/switch-colon-spacing': 'error',
      '@stylistic/template-curly-spacing': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.d.ts'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
    },
  },
];
