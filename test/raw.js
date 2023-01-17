import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`raw`', () => {
  assert.deepEqual(
    // @ts-expect-error non-standard.
    toXml(u('raw', '<script>alert("XSS!")</script>')),
    '&#x3C;script>alert("XSS!")&#x3C;/script>',
    'should encode `raw`s'
  )

  assert.deepEqual(
    // @ts-expect-error non-standard.
    toXml(u('raw', '<script>alert("XSS!")</script>'), {
      allowDangerousXml: true
    }),
    '<script>alert("XSS!")</script>',
    'should not encode `raw`s in `allowDangerousXml` mode'
  )
})
