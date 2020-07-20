/**@type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: {
    es6: true,
    node: true,
  },
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "no-console": "error",
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
  },
  ignorePatterns: ["out/**"],
};
