module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    'fsd'
  ],
  extends: [
    'airbnb-base',
    'plugin:fsd/all'
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
  },
};
