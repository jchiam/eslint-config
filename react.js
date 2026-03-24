import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin';

export default [
  reactPlugin.configs.flat.recommended,
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
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@stylistic/jsx-quotes': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
];
