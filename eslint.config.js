// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const jsdoc = require('eslint-plugin-jsdoc');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  {
    ignores: ['dist/**', 'coverage/**', '.angular/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      jsdoc.configs['flat/recommended'],
      prettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Reglas de Angular
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      // OnPush deshabilitado a proposito: varios componentes actualizan su estado desde
      // callbacks de suscripciones RxJS (HttpClient) sin markForCheck()/signals. Cambiar a
      // OnPush sin refactorizar ese flujo de datos rompe el renderizado (mismo tipo de bug
      // detectado en la migracion de un proyecto hermano). Queda como mejora futura.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',

      // Formato y estilo
      'max-len': [
        'error',
        {
          code: 140,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1 }],

      // Buenas practicas
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      '@typescript-eslint/no-unused-vars': ['error'],
      eqeqeq: ['error', 'always'],
      curly: 'error',

      // Reglas especificas de TypeScript
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: ['public-field', 'public-method', 'protected-field', 'protected-method', 'private-field', 'private-method'],
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Se retira el prefijo obligatorio "I" en interfaces (Hungarian notation):
      // el propio TypeScript Handbook lo desaconseja y habria obligado a renombrar
      // ~14 interfaces del modelo de datos (Movie, Cast, MovieResponse...) usadas
      // en todo el proyecto. Se mantiene la exigencia de PascalCase.
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
      ],

      // Reglas de importacion
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      // Complejidad y mantenibilidad
      complexity: ['warn', 10],
      'max-depth': ['warn', 4],
      'max-lines-per-function': [
        'warn',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-params': ['warn', 4],

      // JSDoc: solo se exige a nivel de clase, no en cada metodo/funcion
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            ClassDeclaration: true,
          },
        },
      ],
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      'max-len': ['error', { code: 140 }],
    },
  },
]);
