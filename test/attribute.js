import assert from 'node:assert/strict'
import test from 'node:test'
import {x} from 'xastscript'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`element` attributes', async (t) => {
  assert.deepEqual(
    toXml(
      // @ts-expect-error: check how runtime does not fail on missing `attributes`.
      u('element', {name: 'y'}, [])
    ),
    '<y></y>',
    'should ignore missing attributes'
  )

  assert.deepEqual(
    toXml(u('element', {name: 'y', attributes: {a: null}}, [])),
    '<y></y>',
    'should ignore attributes set to `null`'
  )

  assert.deepEqual(
    toXml(u('element', {name: 'y', attributes: {a: undefined}}, [])),
    '<y></y>',
    'should ignore attributes set to `undefined`'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('element', {name: 'y', attributes: {a: Number.NaN}}, [])),
    '<y a="NaN"></y>',
    'should include attributes set to `NaN`'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('element', {name: 'y', attributes: {a: true}}, [])),
    '<y a="true"></y>',
    'should include attributes set to `true`'
  )

  assert.deepEqual(
    toXml(u('element', {name: 'y', attributes: {a: 'b'}}, [])),
    '<y a="b"></y>',
    'should include attributes set to a string'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('element', {name: 'y', attributes: {a: ['b', 'c']}}, [])),
    '<y a="b,c"></y>',
    'should include attributes set to an array'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('element', {name: 'y', attributes: {a: 1}}, [])),
    '<y a="1"></y>',
    'should include attributes set to a number'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('element', {name: 'y', attributes: {a: 0}}, [])),
    '<y a="0"></y>',
    'should include attributes set to `0`'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('element', {name: 'y', attributes: {a: {toString}}}, [])),
    '<y a="yup"></y>',
    'should stringify unknowns set to objects'
  )

  await t.test('quote', () => {
    assert.deepEqual(
      toXml(x('y', {a: 'b'})),
      '<y a="b"></y>',
      'should quote attribute values with double quotes by default'
    )

    assert.deepEqual(
      toXml(x('y', {a: 'b'}), {quote: "'"}),
      "<y a='b'></y>",
      'should quote attribute values with single quotes if `quote: "\'"`'
    )

    assert.deepEqual(
      toXml(x('y', {a: 'b'}), {quote: '"'}),
      '<y a="b"></y>',
      "should quote attribute values with double quotes if `quote: '\"'`"
    )

    assert.deepEqual(
      toXml(x('y', {a: "'b'"}), {quote: "'"}),
      "<y a='&#x27;b&#x27;'></y>",
      'should quote attribute values with single quotes if `quote: "\'"` even if they occur in value'
    )

    assert.deepEqual(
      toXml(x('y', {a: '"b"'}), {quote: '"'}),
      '<y a="&#x22;b&#x22;"></y>',
      "should quote attribute values with double quotes if `quote: '\"'` even if they occur in value"
    )

    assert.throws(
      () => {
        // @ts-expect-error runtime.
        toXml(x('y'), {quote: '`'})
      },
      /Invalid quote ```, expected `'` or `"`/,
      'should throw on invalid quotes'
    )
  })

  await t.test('quoteSmart', () => {
    assert.deepEqual(
      toXml(x('y', {a: 'b'}), {quoteSmart: true}),
      '<y a="b"></y>',
      'should quote attribute values with primary quotes by default (`"`)'
    )

    assert.deepEqual(
      toXml(x('y', {a: 'b'}), {quote: "'", quoteSmart: true}),
      "<y a='b'></y>",
      "should quote attribute values with primary quotes by default (`'`)"
    )

    assert.deepEqual(
      toXml(x('y', {a: "'b'"}), {quoteSmart: true}),
      '<y a="\'b\'"></y>',
      'should quote attribute values with primary quotes if the alternative occurs'
    )

    assert.deepEqual(
      toXml(x('y', {a: "'\"b'"}), {quoteSmart: true}),
      '<y a="\'&#x22;b\'"></y>',
      'should quote attribute values with primary quotes if they occur less than the alternative'
    )

    assert.deepEqual(
      toXml(x('y', {a: '"b\''}), {quoteSmart: true}),
      '<y a="&#x22;b\'"></y>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)'
    )

    assert.deepEqual(
      toXml(x('y', {a: '"\'b\'"'}), {quoteSmart: true}),
      '<y a="&#x22;\'b\'&#x22;"></y>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#2)'
    )

    assert.deepEqual(
      toXml(x('y', {a: '"b"'}), {quoteSmart: true}),
      '<y a=\'"b"\'></y>',
      'should quote attribute values with alternative quotes if the primary occurs'
    )

    assert.deepEqual(
      toXml(x('y', {a: '"\'b"'}), {quoteSmart: true}),
      '<y a=\'"&#x27;b"\'></y>',
      'should quote attribute values with alternative quotes if they occur less than the primary'
    )
  })

  await t.test('entities in attributes', () => {
    assert.deepEqual(
      toXml(x('y', {'3<5': 'a'})),
      '<y 3&#x3C;5="a"></y>',
      'should encode entities in attribute names'
    )

    assert.deepEqual(
      toXml(x('y', {'a\0b': 'c'})),
      '<y ab="c"></y>',
      'should strip illegal characters in attribute names'
    )

    assert.deepEqual(
      toXml(x('y', {a: '3<5'})),
      '<y a="3&#x3C;5"></y>',
      'should encode entities in attribute values'
    )

    assert.deepEqual(
      toXml(x('y', {a: 'b\0c'})),
      '<y a="bc"></y>',
      'should strip illegal characters in attribute values'
    )

    assert.deepEqual(
      toXml(x('y', {'3=5': 'a'})),
      '<y 3&#x3D;5="a"></y>',
      'should encode `=` in attribute names'
    )

    assert.deepEqual(
      toXml(x('y', {a: '3=5'})),
      '<y a="3=5"></y>',
      'should not encode `=` in attribute values'
    )
  })
})

function toString() {
  return 'yup'
}
