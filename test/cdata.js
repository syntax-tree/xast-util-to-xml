import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`cdata`', function (t) {
  t.deepEqual(
    toXml(u('cdata', '3 < 5 & 8 > 13')),
    '<![CDATA[3 < 5 & 8 > 13]]>',
    'should not encode `cdata`s'
  )

  t.deepEqual(
    toXml(u('cdata', '3 ]]> 5')),
    '<![CDATA[3 ]]&#x3E; 5]]>',
    'should encode cdata otherwise closing `cdata`s'
  )

  t.end()
})
