// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'dist/index.js',
  output: [
    {
      file: 'dist-js/bundle.umd.js',
      format: 'umd',
      name: 'YourLibraryName'
      // If you have external dependencies
    //   globals: {
    //     'some-dependency': 'SomeDependency'
    //   }
    },
    // You can also output ES module version alongside UMD
    {
      file: 'dist-js/bundle.es.js',
      format: 'es'
    }
  ],
  plugins: [
    svelte({
      compilerOptions: {
        // Generate regular DOM elements, not custom elements
        customElement: false
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    terser() // Minify the output
  ],
  // List your external dependencies
  external: ['some-dependency']
}