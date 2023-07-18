import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from 'xast-util-to-xml'

test('`text`', async function (t) {
  await t.test('should serialize `text`s', async function () {
    assert.deepEqual(toXml(u('text', 'alpha')), 'alpha')
  })

  await t.test('should encode `text`s', async function () {
    assert.deepEqual(
      toXml(u('text', '3 < 5 & 8 > 13')),
      '3 &#x3C; 5 &#x26; 8 > 13'
    )
  })
})
