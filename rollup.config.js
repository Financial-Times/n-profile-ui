import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const external = Object.keys(pkg.dependencies);

export default [
	{
		input: 'src/js/client/main.ts',
		external,
		output: {
			file: pkg.browser,
			format: 'es',
		},
		plugins: [typescript()],
	},
	{
		input: 'src/js/server/main.ts',
		external,
		output: {
			file: pkg.main,
			format: 'cjs',
		},
		plugins: [typescript()],
	},
];
