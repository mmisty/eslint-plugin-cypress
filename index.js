module.exports = {
  root: true,
  env: {
    'es6': true,
    'browser': false,
    'node': true,
    'commonjs': false,
    'es2021': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'project': 'tsconfig.json',
    'ecmaVersion': 2020,
    'sourceType': 'module',
  },
  ignorePatterns: ['*.yaml', '*.yml', '*.csv'],
  configs: {
    "jest-recommended": {
      plugins: ["@parsable/tests"],
      rules: {
        "@parsable/tests/test-title-pattern-jest": "error",
        "@parsable/tests/disallow-only": "error"
      }
    },
    "mocha-recommended": {
      plugins: ["@parsable/tests"],
      rules: {
        "@parsable/tests/test-title-pattern-mocha": "error",
        "@parsable/tests/disallow-only": "error",
        "@parsable/tests/disallow-get-get-chain": "warn",
      }
    },
  },
  rules: {
    'test-title-pattern-mocha': require('./lib/test-title-pattern-mocha'),
    'test-title-pattern-jest': require('./lib/test-title-pattern-jest'),
    'disallow-only': require('./lib/test-only-disallowed'),
    'disallow-get-get': require('./lib/test-get-get-disallowed')
  },
};
