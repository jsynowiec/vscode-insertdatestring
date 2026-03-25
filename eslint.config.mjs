// ABOUTME: ESLint flat config for the extension.
// ABOUTME: Uses typescript-eslint v8 with prettier integration.
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    rules: {
      "no-console": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    ignores: ["out/**", "dist/**"],
  }
);
