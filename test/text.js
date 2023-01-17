import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`text`', () => {
  assert.deepEqual(
    toXml(u('text', 'alpha')),
    'alpha',
    'should serialize `text`s'
  )

  assert.deepEqual(
    toXml(u('text', '3 < 5 & 8 > 13')),
    '3 &#x3C; 5 &#x26; 8 > 13',
    'should encode `text`s'
  )
})
