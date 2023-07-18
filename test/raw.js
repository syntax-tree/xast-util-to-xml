import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`raw`', async function (t) {
  await t.test('should encode `raw`s', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles `raw` nodes.
      toXml(u('raw', '<script>alert("XSS!")</script>')),
      '&#x3C;script>alert("XSS!")&#x3C;/script>'
    )
  })

  await t.test(
    'should not encode `raw`s in `allowDangerousXml` mode',
    async function () {
      assert.deepEqual(
        // @ts-expect-error: check how the runtime handles `raw` nodes.
        toXml(u('raw', '<script>alert("XSS!")</script>'), {
          allowDangerousXml: true
        }),
        '<script>alert("XSS!")</script>'
      )
    }
  )
})
