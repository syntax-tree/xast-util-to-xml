import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('toXml()', function (t) {
  t.throws(
    function () {
      toXml(true)
    },
    /Expected node, not `true`/,
    'should throw on non-nodes'
  )

  t.throws(
    function () {
      toXml(u('foo', []))
    },
    /Cannot compile unknown node `foo`/,
    'should throw on unknown nodes'
  )

  t.end()
})
