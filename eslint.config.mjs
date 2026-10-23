import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // eslint-config-next 16 brings eslint-plugin-react-hooks 7, which adds
    // React Compiler rules as errors. This app does not enable the React
    // Compiler, and the flagged code (localStorage hydration in effects,
    // useCallback deps) predates the upgrade. Keep them visible as warnings
    // so the Next 16 upgrade does not change runtime behavior.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
