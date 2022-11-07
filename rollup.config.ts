import { nodeResolve } from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { RollupOptions } from "rollup"

const packageJson = (await readFile(path.resolve("package.json"))).toString()
const version = (JSON.parse(packageJson) as { version: string }).version

const config: RollupOptions = {
  input: path.resolve("src", "index.ts"),
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
    format: "commonjs",
    strict: false,
    intro: `#!/usr/bin/env node\n\n// @mkobayashime/trimvideo v${version}\n// https://github.com/mkobayashime/trimvideo`,
  },
  plugins: [typescript(), nodeResolve()],
}

// eslint-disable-next-line import/no-default-export
export default config
