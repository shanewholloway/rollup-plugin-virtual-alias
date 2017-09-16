# rollup-plugin-virtual-alias

Alias dependencies using virtual modules.

## Usage

Suppose you are working with an existing codebase and want to substitute one
API compatible dependency for another. In my case, I wanted to try
`preact-compat` in place of `react`.

```js
// src.main.js
import React from 'react';
import ReactDOM from 'react-dom';
```

```js
// rollup.config.js
import virtual_alias from 'rollup-plugin-virtual-alias';

export default {
  entry: 'src/main.js',
  // ...
  plugins: [
    virtual_alias({
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    }),
  ]
};
```

As with `rollup-plugin-virtual`, use this plugin __before__ other plugins like
`rollup-plugin-node-resolve` or `rollup-plugin-commonjs`.

## Implementation

This package translates each pair in the mapping passed to `virtual_alias()`
into a module string for `rollup-plugin-virtual`.  So the following:

```js
import virtual_alias from 'rollup-plugin-virtual-alias';

    // ...
    virtual_alias({
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    }),
    // ...

```

Is equivalent to:

```js
import virtual from 'rollup-plugin-virtual';

    // ...
    virtual({
      'react': `
          export * from "preact-compat"
          export {default} from "preact-compat"
          `,

      'react-dom': `
          export * from "preact-compat"
          export {default} from "preact-compat"
          `,
    })
    // ...
…
```

## License

This package was inspired and heavily derived from Rich-Harris's work in
[`rollup/rollup-plugin-virtual`](https://github.com/rollup/rollup-plugin-virtual).

[MIT](LICENSE)
