import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

let production = !process.env.ROLLUP_WATCH;

export default [{
    input: "src/main.js",
    output: {
        sourcemap: !production,
        format: "esm",
        file: "build/bundle.js",
        // dir: "build/",
    },
    plugins: [
        svelte({
            dev: production,
            // css: css => {
            //     css.write("build/app.css", !production);
            // },
        }),
        resolve({
            browser: true,
            dedupe: importee => importee === "svelte" || importee.startsWith("svelte/")
        }),
        !production && serve({
            contentBase: ["public", "build"],
            port: 5000,
            historyApiFallback: true,
        }),
        !production && livereload("build"),
        production && terser({
            mangle: false,
        }),
    ],
    watch: {
        clearScreen: false,
    },
}];
