// ABOUTME: esbuild script for bundling the VS Code extension.
// ABOUTME: Produces a single CJS file in dist/ with vscode marked as external.
import esbuild from "esbuild";

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["src/extension.ts"],
  bundle: true,
  outfile: "dist/extension.js",
  external: ["vscode"],
  format: "cjs",
  platform: "node",
  target: "node22",
  sourcesContent: false,
  minify: production,
  sourcemap: !production,
};

const ctx = await esbuild.context(options);
if (watch) {
  await ctx.watch();
  console.log("Watching...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
