import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`comment`', async function (t) {
  await t.test('should serialize `comment`s', async function () {
    assert.deepEqual(toXml(u('comment', 'alpha')), '<!--alpha-->')
  })

  await t.test('should not encode `comment`s (#1)', async function () {
    assert.deepEqual(toXml(u('comment', 'AT&T')), '<!--AT&T-->')
  })

  await t.test('should not encode `comment`s (#2)', async function () {
    // No way to get around this.
    assert.deepEqual(toXml(u('comment', '-->')), '<!--&#x2D;&#x2D;>-->')
  })
})
