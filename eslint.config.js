import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import eslintTerrestris from '@terrestris/eslint-config-typescript';

// Deine existierenden Importe bleiben bestehen
import tsEslint from 'typescript-eslint';
import eslint from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import stylisticPlugin from '@stylistic/eslint-plugin';

export default tsEslint.config({
  extends: [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.stylistic,
    importPlugin.flatConfigs.recommended,
    prettierConfig,
  ],
  files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  ignores: ['node_modules', 'dist'],
  plugins: {
    react: reactPlugin,
    '@stylistic': stylisticPlugin,
    'react-hooks': reactHooksPlugin,
    'react-refresh': reactRefreshPlugin,
    prettier: prettierPlugin,
  },
  languageOptions: {
    globals: globals.browser,
    ecmaVersion: 'latest',
    parserOptions: {
      project: './tsconfig.app.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    ...eslintTerrestris.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'max-len': [
      'warn',
      {
        code: 160,
      },
    ],

    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'prettier/prettier': 'warn',

    'no-unused-vars': 'warn',
    'arrow-spacing': 'warn',
    'comma-spacing': 'warn',
    'comma-dangle': 'off',
    'eol-last': 'warn',
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
      },
    ],
    'object-property-newline': 'warn',
    'object-curly-newline': 'off',
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    'react/jsx-max-props-per-line': [
      'warn',
      {
        maximum: 1,
        when: 'multiline',
      },
    ],
    'react/jsx-closing-tag-location': ['warn'],
    'react/jsx-closing-bracket-location': ['warn'],

    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@terrestris/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
