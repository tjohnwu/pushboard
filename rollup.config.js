import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default {
  input: "app/components/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    babel(),
    resolve(),
    commonjs(),
    postcss(),
  ]
}
