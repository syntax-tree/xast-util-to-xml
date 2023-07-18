import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('toXml()', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('../index.js')).sort(), ['toXml'])
  })

  await t.test('should throw on non-nodes', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles non-nodes.
      toXml(true)
    }, /Expected node, not `true`/)
  })

  await t.test('should throw on unknown nodes', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles unknown nodes.
      toXml(u('foo', []))
    }, /Cannot compile unknown node `foo`/)
  })
})
