import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */

export default [
  { files: ['**/*.{js,ts}'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
  eslintConfigPrettier,
  {
    plugins: {
      '@unicorn': unicorn,
    },
    rules: {
      'handle-callback-err': ['error', '^(err|error)$'],
      'max-len': [
        'error',
        {
          code: 100,
          comments: 120,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-multi-spaces': 'error',

      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],

      '@unicorn/prefer-module': 'error',
      '@unicorn/prefer-node-protocol': 'error',
      '@unicorn/filename-case': [
        'error',
        {
          case: 'snakeCase',
        },
      ],
      '@unicorn/no-await-expression-member': 'error',
      '@unicorn/no-for-loop': 'error',
      '@unicorn/no-instanceof-array': 'error',
      '@unicorn/prefer-number-properties': 'error',

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
]
