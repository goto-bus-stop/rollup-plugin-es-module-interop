const interopDefault = `
  function _interopDefault(ex) {
    return ex && ex.__esModule ? ex.default : ex;
  }
`.trim().replace(/\s+/g, ' ')

// Fix for importing non-transpiled CommonJS modules that have a
// `.default` export.
export default () => ({
  name: 'es-module-interop',
  renderChunk (code, chunk, options) {
    if (options.format !== 'cjs') {
      return null
    }
    return code.replace(
      /\nfunction _interopDefault (.*?)\n/,
      () => `\n${interopDefault.replace(/\n */g, ' ')}\n`
    )
  }
})
