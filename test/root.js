import test from 'tape'
import x from 'xastscript'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`root`', function (t) {
  t.deepEqual(
    toXml(
      u('root', [u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')])
    ),
    'alpha <y>bravo</y> charlie',
    'should serialize `root`s'
  )

  t.deepEqual(
    toXml([u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')]),
    'alpha <y>bravo</y> charlie',
    'should serialize a list of nodes'
  )

  t.end()
})
