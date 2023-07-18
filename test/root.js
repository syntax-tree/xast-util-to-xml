import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {x} from 'xastscript'
import {toXml} from 'xast-util-to-xml'

test('`root`', async function (t) {
  await t.test('should serialize `root`s', async function () {
    assert.deepEqual(
      toXml(
        u('root', [u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')])
      ),
      'alpha <y>bravo</y> charlie'
    )
  })

  await t.test('should serialize a list of nodes', async function () {
    assert.deepEqual(
      toXml([u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')]),
      'alpha <y>bravo</y> charlie'
    )
  })
})
