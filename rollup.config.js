import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");
module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        sourcemap: true,
        format: "cjs",
      },
      {
        file: packageJson.module,
        sourcemap: true,
        format: "esm",
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
