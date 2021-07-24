import test from 'tape'
import x from 'xastscript'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`element` attributes', (t) => {
  t.deepEqual(
    toXml(u('element', {name: 'y'}, [])),
    '<y></y>',
    'should ignore missing attributes'
  )

  t.deepEqual(
    toXml(u('element', {name: 'y', attributes: {a: null}}, [])),
    '<y></y>',
    'should ignore attributes set to `null`'
  )

  t.deepEqual(
    toXml(u('element', {name: 'y', attributes: {a: undefined}}, [])),
    '<y></y>',
    'should ignore attributes set to `undefined`'
  )

  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('element', {name: 'y', attributes: {a: Number.NaN}}, [])),
    '<y a="NaN"></y>',
    'should include attributes set to `NaN`'
  )

  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('element', {name: 'y', attributes: {a: true}}, [])),
    '<y a="true"></y>',
    'should include attributes set to `true`'
  )

  t.deepEqual(
    toXml(u('element', {name: 'y', attributes: {a: 'b'}}, [])),
    '<y a="b"></y>',
    'should include attributes set to a string'
  )

  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('element', {name: 'y', attributes: {a: ['b', 'c']}}, [])),
    '<y a="b,c"></y>',
    'should include attributes set to an array'
  )

  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('element', {name: 'y', attributes: {a: 1}}, [])),
    '<y a="1"></y>',
    'should include attributes set to a number'
  )

  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('element', {name: 'y', attributes: {a: 0}}, [])),
    '<y a="0"></y>',
    'should include attributes set to `0`'
  )

  t.deepEqual(
    // @ts-ignore runtime.
    toXml(u('element', {name: 'y', attributes: {a: {toString}}}, [])),
    '<y a="yup"></y>',
    'should stringify unknowns set to objects'
  )

  t.end()

  t.test('quote', (st) => {
    st.deepEqual(
      toXml(x('y', {a: 'b'})),
      '<y a="b"></y>',
      'should quote attribute values with double quotes by default'
    )

    st.deepEqual(
      toXml(x('y', {a: 'b'}), {quote: "'"}),
      "<y a='b'></y>",
      'should quote attribute values with single quotes if `quote: "\'"`'
    )

    st.deepEqual(
      toXml(x('y', {a: 'b'}), {quote: '"'}),
      '<y a="b"></y>',
      "should quote attribute values with double quotes if `quote: '\"'`"
    )

    st.deepEqual(
      toXml(x('y', {a: "'b'"}), {quote: "'"}),
      "<y a='&#x27;b&#x27;'></y>",
      'should quote attribute values with single quotes if `quote: "\'"` even if they occur in value'
    )

    st.deepEqual(
      toXml(x('y', {a: '"b"'}), {quote: '"'}),
      '<y a="&#x22;b&#x22;"></y>',
      "should quote attribute values with double quotes if `quote: '\"'` even if they occur in value"
    )

    st.throws(
      () => {
        // @ts-ignore runtime.
        toXml(x('y'), {quote: '`'})
      },
      /Invalid quote ```, expected `'` or `"`/,
      'should throw on invalid quotes'
    )

    st.end()
  })

  t.test('quoteSmart', (st) => {
    st.deepEqual(
      toXml(x('y', {a: 'b'}), {quoteSmart: true}),
      '<y a="b"></y>',
      'should quote attribute values with primary quotes by default'
    )

    st.deepEqual(
      toXml(x('y', {a: "'b'"}), {quoteSmart: true}),
      '<y a="\'b\'"></y>',
      'should quote attribute values with primary quotes if the alternative occurs'
    )

    st.deepEqual(
      toXml(x('y', {a: "'\"b'"}), {quoteSmart: true}),
      '<y a="\'&#x22;b\'"></y>',
      'should quote attribute values with primary quotes if they occur less than the alternative'
    )

    st.deepEqual(
      toXml(x('y', {a: '"b\''}), {quoteSmart: true}),
      '<y a="&#x22;b\'"></y>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)'
    )

    st.deepEqual(
      toXml(x('y', {a: '"\'b\'"'}), {quoteSmart: true}),
      '<y a="&#x22;\'b\'&#x22;"></y>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#2)'
    )

    st.deepEqual(
      toXml(x('y', {a: '"b"'}), {quoteSmart: true}),
      '<y a=\'"b"\'></y>',
      'should quote attribute values with alternative quotes if the primary occurs'
    )

    st.deepEqual(
      toXml(x('y', {a: '"\'b"'}), {quoteSmart: true}),
      '<y a=\'"&#x27;b"\'></y>',
      'should quote attribute values with alternative quotes if they occur less than the primary'
    )

    st.end()
  })

  t.test('entities in attributes', (st) => {
    st.deepEqual(
      toXml(x('y', {'3<5': 'a'})),
      '<y 3&#x3C;5="a"></y>',
      'should encode entities in attribute names'
    )

    st.deepEqual(
      toXml(x('y', {'a\0b': 'c'})),
      '<y ab="c"></y>',
      'should strip illegal characters in attribute names'
    )

    st.deepEqual(
      toXml(x('y', {a: '3<5'})),
      '<y a="3&#x3C;5"></y>',
      'should encode entities in attribute values'
    )

    st.deepEqual(
      toXml(x('y', {a: 'b\0c'})),
      '<y a="bc"></y>',
      'should strip illegal characters in attribute values'
    )

    st.deepEqual(
      toXml(x('y', {'3=5': 'a'})),
      '<y 3&#x3D;5="a"></y>',
      'should encode `=` in attribute names'
    )

    st.deepEqual(
      toXml(x('y', {a: '3=5'})),
      '<y a="3=5"></y>',
      'should not encode `=` in attribute values'
    )

    st.end()
  })
})

function toString() {
  return 'yup'
}
