module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', require('./.prettierrc.js')],
    'prefer-template': 'error',
  },
  ignorePatterns: ['*.yaml', '*.yml', '*.csv'],
};
