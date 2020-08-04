const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');

const inputOptions = {
  input: 'src/index.ts',
  plugins: [rollupTypescript()],
};

const outputOptions = {
  file: 'lib/index.umd.js',
  format: 'umd',
  name: 'editor',
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
