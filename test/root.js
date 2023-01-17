import assert from 'node:assert/strict'
import test from 'node:test'
import {x} from 'xastscript'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`root`', () => {
  assert.deepEqual(
    toXml(
      u('root', [u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')])
    ),
    'alpha <y>bravo</y> charlie',
    'should serialize `root`s'
  )

  assert.deepEqual(
    toXml([u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')]),
    'alpha <y>bravo</y> charlie',
    'should serialize a list of nodes'
  )
})
