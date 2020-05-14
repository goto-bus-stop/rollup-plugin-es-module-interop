import MagicString from 'magic-string';

const interopDefault = `
  function _interopDefault(ex) {
    return ex && ex.__esModule ? ex.default : ex;
`
  .trim()
  .replace(/\s+/g, ' ');

// Fix for importing non-transpiled CommonJS modules that have a
// `.default` export.
export default function () {
  return {
    name: 'es-module-interop',
    renderChunk(code, chunk, options) {
      if (options.format !== 'cjs') {
        return null;
      }

      const interopDefaultStart = code.indexOf('function _interopDefault');

      if (interopDefaultStart < 0) {
        throw Error('No interopDefault function, in ' + chunk.fileName);
      }

      const interopDefaultEnd = code.indexOf('}', interopDefaultStart);

      const magicString = new MagicString(code);

      magicString.overwrite(
        interopDefaultStart,
        interopDefaultEnd,
        interopDefault
      );

      const result = {
        code: magicString.toString(),
      };

      if (options.sourcemap || options.sourceMap) {
        result.map = magicString.generateMap({ hires: true });
      }

      return result;
    },
  };
}
