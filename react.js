import eslintReact from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin';

export default [
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
