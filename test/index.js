var test = require('tape')
var vm = require('vm')
var rollup = require('rollup').rollup
var joi = require('joi')
var esInterop = require('../')

test('Can import joi', function (t) {
  t.plan(2)

  // joi has an export named `default` that rollup would normally use.
  // this code does not work with rollup's default cjs configuration.
  const src = `
    import joi from 'joi'

    export default joi.string().min(6).max(10)
  `

  rollup({
    input: '<entry>',
    plugins: [
      esInterop(),
      entry(src)
    ],
    external: [ 'joi' ]
  }).then((bundle) => {
    return bundle.generate({ format: 'cjs' })
  }).then((outputs) => {
    var code = outputs.output[0].code
    var module = { exports: {} }
    vm.runInNewContext(code, { require, module })
    joi.validate('abcdef', module.exports, (err) => {
      t.ifError(err)
    })
    joi.validate('abc', module.exports, (err) => {
      t.ok(err)
    })
  }).catch(t.fail)
})

function entry (src) {
  return {
    resolveId (id) { if (id === '<entry>') return id },
    load (id) { if (id === '<entry>') return src }
  }
}
