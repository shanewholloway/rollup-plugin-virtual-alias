const path = require('path');
const assert = require('assert');
const virtual = require('../dist/rollup-plugin-virtual-alias.cjs');

describe('rollup-plugin-virtual-alias', () => {
	it('loads "react" dependency as "preact-compat"', () => {
		const plugin = virtual({
			'react': 'preact-compat'
		});

		const resolved = plugin.resolveId('react');

		assert.equal(resolved, '\0virtual:react');
		assert.deepEqual(
      plugin.load(resolved).split('\n'), 
      ['export *  from "preact-compat";',
       'export {default} from "preact-compat";',
       '']);
	});
});
