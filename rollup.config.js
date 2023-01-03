import {readFileSync} from "node:fs";
import {terser} from "rollup-plugin-terser";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));
const year = new Date().getFullYear();
const bannerLong = `/**
 * ${pkg.name}
 *
 * @copyright ${year} ${pkg.author}
 * @license ${pkg.license}
 * @version ${pkg.version}
 */`;
const bannerShort = `/*!
 ${year} ${pkg.author}
 @version ${pkg.version}
*/`;
const defaultOutBase = {compact: true, banner: bannerLong, name: pkg.name};
const cjOutBase = {...defaultOutBase, format: "cjs", exports: "named"};
const esmOutBase = {...defaultOutBase, format: "esm"};
const minOutBase = {banner: bannerShort, name: pkg.name, plugins: [terser()], sourcemap: true};

export default [
	{
		input: "./src/precise.js",
		output: [
			{
				...cjOutBase,
				file: `dist/${pkg.name}.cjs`
			},
			{
				...esmOutBase,
				file: `dist/${pkg.name}.esm.js`
			},
			{
				...esmOutBase,
				...minOutBase,
				file: `dist/${pkg.name}.esm.min.js`
			}
		]
	}
];
