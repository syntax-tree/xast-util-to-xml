import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('toXml()', () => {
  assert.throws(
    () => {
      // @ts-expect-error runtime.
      toXml(true)
    },
    /Expected node, not `true`/,
    'should throw on non-nodes'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      toXml(u('foo', []))
    },
    /Cannot compile unknown node `foo`/,
    'should throw on unknown nodes'
  )
})
