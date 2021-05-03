import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`instruction`', function (t) {
  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('instruction')),
    '<?x?>',
    'should serialize instructions without `name`'
  )

  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('instruction', {name: 'xml'})),
    '<?xml?>',
    'should serialize instructions with `name`'
  )

  t.deepEqual(
    toXml(u('instruction', {name: 'xml'}, 'version="1.0"')),
    '<?xml version="1.0"?>',
    'should serialize instructions with a value'
  )

  t.end()
})
