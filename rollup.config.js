const pkg = require('./package.json')

export default {
  input: pkg.module,
  output: {
    format: 'cjs',
    exports: 'default',
    file: pkg.main
  },
  external: ['magic-string']
}
