import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
	input: 'src/index.mjs',
	plugins: [resolve()],
	external: ['path', 'rollup-plugin-virtual'],
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' },
	]
};
