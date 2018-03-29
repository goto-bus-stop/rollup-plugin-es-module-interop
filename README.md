# rollup-plugin-es-module-interop

change the rollup commonjs output for external imports to check `module.__esModule`

## What?

By default, when rollup is configured to output `format: 'cjs'` code, its `require` calls look like this:

```js
function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var external = _interopDefault(require('external'));
```

That is, if the imported CommonJS module has a `.default` property, `external` will be equal to `require('external').default`. Else, it will be equal to `require('external')`.

This makes ES modules that were compiled to CommonJS and then published to npm work transparently, because they put their default exports on a `.default` property.
But some CommonJS modules also use the `.default` property as an actual exported value, and not as a "default export". [`joi`](https://npmjs.com/joi) is one example.

Babel uses a different check than Rollup does; it checks for the `__esModule` property, and if it exists, uses `require('external').default`. Else, it will use `require('external')`. The `__esModule` property is added by every compiler that I know of, and CommonJS modules that have a `.default` property will not be falsely detected as compiled ES modules.

This plugin swaps the Rollup version of `_interopDefault` for Babel's version.
So, with this plugin you can `import joi from 'joi'` and it'll work!

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/rollup-plugin-es-module-interop.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/rollup-plugin-es-module-interop
[travis-image]: https://img.shields.io/travis/goto-bus-stop/rollup-plugin-es-module-interop.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/rollup-plugin-es-module-interop
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install rollup-plugin-es-module-interop
```

## Usage

```js
// rollup.config.js
import esModuleInterop from 'rollup-plugin-es-module-interop'

export default {
  plugins: [
    esModuleInterop()
  ]
}
```

There are no options. `rollup-plugin-es-module-interop` will replace the `_interopDefault` implementation in all `format: 'cjs'` outputs.

## License

[Apache-2.0](LICENSE.md)
