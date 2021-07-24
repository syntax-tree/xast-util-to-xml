import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`comment`', (t) => {
  t.deepEqual(
    toXml(u('comment', 'alpha')),
    '<!--alpha-->',
    'should serialize `comment`s'
  )

  t.deepEqual(
    toXml(u('comment', 'AT&T')),
    '<!--AT&T-->',
    'should not encode `comment`s (#1)'
  )

  // No way to get around this.
  t.deepEqual(
    toXml(u('comment', '-->')),
    '<!--&#x2D;&#x2D;>-->',
    'should not encode `comment`s (#2)'
  )

  t.end()
})
