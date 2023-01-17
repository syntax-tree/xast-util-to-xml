import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`instruction`', () => {
  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('instruction')),
    '<?x?>',
    'should serialize instructions without `name`'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('instruction', {name: 'xml'})),
    '<?xml?>',
    'should serialize instructions with `name`'
  )

  assert.deepEqual(
    toXml(u('instruction', {name: 'xml'}, 'version="1.0"')),
    '<?xml version="1.0"?>',
    'should serialize instructions with a value'
  )
})
