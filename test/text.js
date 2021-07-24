import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`text`', (t) => {
  t.deepEqual(toXml(u('text', 'alpha')), 'alpha', 'should serialize `text`s')

  t.deepEqual(
    toXml(u('text', '3 < 5 & 8 > 13')),
    '3 &#x3C; 5 &#x26; 8 > 13',
    'should encode `text`s'
  )

  t.end()
})
