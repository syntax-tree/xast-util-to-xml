import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`raw`', function (t) {
  t.deepEqual(
    // @ts-ignore non-standard.
    toXml(u('raw', '<script>alert("XSS!")</script>')),
    '&#x3C;script>alert("XSS!")&#x3C;/script>',
    'should encode `raw`s'
  )

  t.deepEqual(
    // @ts-ignore non-standard.
    toXml(u('raw', '<script>alert("XSS!")</script>'), {
      allowDangerousXml: true
    }),
    '<script>alert("XSS!")</script>',
    'should not encode `raw`s in `allowDangerousXml` mode'
  )

  t.end()
})
