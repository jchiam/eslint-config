import recommended from './recommended.js';
import eslintReact from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin';

// Self-contained React + TypeScript config. It includes the base `recommended`
// config, so consumers spread a single array (`[...jchiamReact]`) rather than
// composing base + react themselves and having to get the order right.
// recommended.js remains the standalone base for non-React projects.
export default [
  ...recommended,
  eslintReact.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@stylistic/jsx-quotes': 'error',
    },
  },
];
