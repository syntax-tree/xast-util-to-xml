import assert from 'node:assert/strict'
import test from 'node:test'
import {x} from 'xastscript'
import {toXml} from 'xast-util-to-xml'

test('`element`', async function (t) {
  await t.test('should serialize `element`s w/o children', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles no `children`.
      toXml({type: 'element', attributes: {}, name: 'a'}),
      '<a></a>'
    )
  })

  await t.test('should serialize `element`s', async function () {
    assert.deepEqual(toXml(x('y', 'bravo')), '<y>bravo</y>')
  })

  await t.test(
    'should serialize with ` /` in `closeEmptyElements` mode',
    async function () {
      assert.deepEqual(toXml(x('y'), {closeEmptyElements: true}), '<y />')
    }
  )

  await t.test(
    'should serialize with `/` in `closeEmptyElements` and `tightClose` mode',
    async function () {
      assert.deepEqual(
        toXml(x('y'), {closeEmptyElements: true, tightClose: true}),
        '<y/>'
      )
    }
  )
})
