import test from 'tape'
import x from 'xastscript'
import {toXml} from '../index.js'

test('`element`', function (t) {
  t.deepEqual(
    toXml({type: 'element', name: 'a'}),
    '<a></a>',
    'should serialize `element`s w/o children'
  )

  t.deepEqual(
    toXml(x('y', 'bravo')),
    '<y>bravo</y>',
    'should serialize `element`s'
  )

  t.deepEqual(
    toXml(x('y'), {closeEmptyElements: true}),
    '<y />',
    'should serialize with ` /` in `closeEmptyElements` mode'
  )

  t.deepEqual(
    toXml(x('y'), {closeEmptyElements: true, tightClose: true}),
    '<y/>',
    'should serialize with `/` in `closeEmptyElements` and `tightClose` mode'
  )

  t.end()
})
