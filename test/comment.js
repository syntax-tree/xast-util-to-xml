import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`comment`', () => {
  assert.deepEqual(
    toXml(u('comment', 'alpha')),
    '<!--alpha-->',
    'should serialize `comment`s'
  )

  assert.deepEqual(
    toXml(u('comment', 'AT&T')),
    '<!--AT&T-->',
    'should not encode `comment`s (#1)'
  )

  // No way to get around this.
  assert.deepEqual(
    toXml(u('comment', '-->')),
    '<!--&#x2D;&#x2D;>-->',
    'should not encode `comment`s (#2)'
  )
})
