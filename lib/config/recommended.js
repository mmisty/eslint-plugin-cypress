'use strict';

module.exports = {
  plugins: ['@mmisty/cypress'],
  env: {
    'cypress/globals': true,
  },
  rules: {
    '@mmisty/cypress/test-title-pattern-mocha': 'warn',
    '@mmisty/cypress/disallow-only': 'error',
    '@mmisty/cypress/disallow-get-get-chain': 'warn',
  },
};
