import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from 'xast-util-to-xml'

test('`cdata`', async function (t) {
  await t.test('should not encode `cdata`s', async function () {
    assert.deepEqual(
      toXml(u('cdata', '3 < 5 & 8 > 13')),
      '<![CDATA[3 < 5 & 8 > 13]]>'
    )
  })

  await t.test(
    'should encode cdata otherwise closing `cdata`s',
    async function () {
      assert.deepEqual(toXml(u('cdata', '3 ]]> 5')), '<![CDATA[3 ]]&#x3E; 5]]>')
    }
  )
})
