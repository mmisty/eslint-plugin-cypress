module.exports = {
  rules: {
    'test-title-pattern': require('./lib/rules/test-title-pattern'),
    'disallow-only': require('./lib/rules/test-only-disallowed'),
    'disallow-get-get-chain': require('./lib/rules/test-get-get-disallowed'),
  },
  root: true,
  env: {
    es6: true,
    browser: false,
    node: true,
    commonjs: false,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ignorePatterns: ['*.yaml', '*.yml', '*.csv'],
  configs: {
    recommended: require('./lib/config/recommended'),
  },
};
