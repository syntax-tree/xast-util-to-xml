import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('toXml()', (t) => {
  t.throws(
    () => {
      // @ts-ignore runtime.
      toXml(true)
    },
    /Expected node, not `true`/,
    'should throw on non-nodes'
  )

  t.throws(
    () => {
      // @ts-ignore runtime.
      toXml(u('foo', []))
    },
    /Cannot compile unknown node `foo`/,
    'should throw on unknown nodes'
  )

  t.end()
})
