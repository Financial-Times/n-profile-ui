module.exports = {
  extends: ['@financial-times/eslint-config-next'],
  ignorePatterns: ['./dist/**/*'],
  rules: {
    indent: ['error', 2],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};
