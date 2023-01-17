import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`cdata`', () => {
  assert.deepEqual(
    toXml(u('cdata', '3 < 5 & 8 > 13')),
    '<![CDATA[3 < 5 & 8 > 13]]>',
    'should not encode `cdata`s'
  )

  assert.deepEqual(
    toXml(u('cdata', '3 ]]> 5')),
    '<![CDATA[3 ]]&#x3E; 5]]>',
    'should encode cdata otherwise closing `cdata`s'
  )
})
