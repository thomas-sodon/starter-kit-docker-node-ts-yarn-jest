// @ts-check

import tseslint from 'typescript-eslint';

import eslint from '@eslint/js';

export default tseslint.config({
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
    ],
});