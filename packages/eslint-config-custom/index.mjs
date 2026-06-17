import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** Shared ignores for every workspace. */
export const ignores = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.next/**',
  '**/storybook-static/**',
  '**/generated/**',
  '**/.turbo/**',
];

/** Base config for any TypeScript package (no type-checking, for speed + simplicity). */
export const base = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      // TypeScript handles undefined identifiers; the core rule produces false positives on types/globals.
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // `interface XProps extends HTMLAttributes<...> {}` is a deliberate, extensible
      // named-props pattern used throughout the design system.
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Config files (next.config.js, postcss.config.js, ...) are CommonJS.
    files: ['**/*.{js,cjs}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];

/** Base + React for any package that ships JSX/TSX. */
export const react = [
  ...base,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
    plugins: { 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/jsx-key': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];
