module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,

  },
  plugins: [
    'fsd'
  ],
  extends: [
    'airbnb-base',
    'plugin:fsd/all'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 'off',
    'linebreak-style': ["error", "windows"]
  },
};
