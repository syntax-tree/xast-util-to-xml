import assert from 'node:assert/strict'
import test from 'node:test'
import {x} from 'xastscript'
import {toXml} from '../index.js'

test('`element`', () => {
  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml({type: 'element', name: 'a'}),
    '<a></a>',
    'should serialize `element`s w/o children'
  )

  assert.deepEqual(
    toXml(x('y', 'bravo')),
    '<y>bravo</y>',
    'should serialize `element`s'
  )

  assert.deepEqual(
    toXml(x('y'), {closeEmptyElements: true}),
    '<y />',
    'should serialize with ` /` in `closeEmptyElements` mode'
  )

  assert.deepEqual(
    toXml(x('y'), {closeEmptyElements: true, tightClose: true}),
    '<y/>',
    'should serialize with `/` in `closeEmptyElements` and `tightClose` mode'
  )
})
