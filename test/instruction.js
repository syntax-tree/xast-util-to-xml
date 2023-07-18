import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`instruction`', async function (t) {
  await t.test(
    'should serialize instructions without `name`',
    async function () {
      assert.deepEqual(
        // @ts-expect-error: check how the runtime handles no `name` field.
        toXml(u('instruction')),
        '<?x?>'
      )
    }
  )

  await t.test('should serialize instructions with `name`', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles no `value` field.
      toXml(u('instruction', {name: 'xml'})),
      '<?xml?>'
    )
  })

  await t.test('should serialize instructions with a value', async function () {
    assert.deepEqual(
      toXml(u('instruction', {name: 'xml'}, 'version="1.0"')),
      '<?xml version="1.0"?>'
    )
  })
})
