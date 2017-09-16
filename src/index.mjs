import virtual from 'rollup-plugin-virtual';

export default function (modules) {
  const mapping = {};

  for (const key of Object.keys(modules)) {
    const alias = modules[key];
    if ('string' !== typeof alias) {
      throw new TypeError(`Expected alias to be a string`);
    }

    const from_alias = ` from ${JSON.stringify(alias)};\n`;
    mapping[key] =
        'export * ' + from_alias
      + 'export {default}' + from_alias ;
  }

  return virtual(mapping);
}
