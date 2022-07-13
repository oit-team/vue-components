module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '@oit',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {},
}
