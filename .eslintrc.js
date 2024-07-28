module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@darraghor/nestjs-typed', 'security', 'no-unsanitized'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
    'plugin:security/recommended',
    'plugin:no-unsanitized/DOM'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js','volumes/'],
  rules: {
    '@darraghor/nestjs-typed/injectable-should-be-provided': 'off',
    '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
    '@darraghor/nestjs-typed/all-properties-are-whitelisted': 'off',
    '@darraghor/nestjs-typed/all-properties-have-explicit-defined': 'off',
    '@sonarjs/no-duplicate-string': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-floating-promises": 'error',
    "no-unused-vars": "off",
    "no-console": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
  },
};
