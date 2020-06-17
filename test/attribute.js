'use strict'

var test = require('tape')
var x = require('xastscript')
var u = require('unist-builder')
var to = require('..')

test('`element` attributes', function (t) {
  t.deepEqual(
    to(u('element', {name: 'y'}, [])),
    '<y></y>',
    'should ignore missing attributes'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: null}}, [])),
    '<y></y>',
    'should ignore attributes set to `null`'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: undefined}}, [])),
    '<y></y>',
    'should ignore attributes set to `undefined`'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: NaN}}, [])),
    '<y a="NaN"></y>',
    'should include attributes set to `NaN`'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: true}}, [])),
    '<y a="true"></y>',
    'should include attributes set to `true`'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: 'b'}}, [])),
    '<y a="b"></y>',
    'should include attributes set to a string'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: ['b', 'c']}}, [])),
    '<y a="b,c"></y>',
    'should include attributes set to an array'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: 1}}, [])),
    '<y a="1"></y>',
    'should include attributes set to a number'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: 0}}, [])),
    '<y a="0"></y>',
    'should include attributes set to `0`'
  )

  t.deepEqual(
    to(u('element', {name: 'y', attributes: {a: {toString: toString}}}, [])),
    '<y a="yup"></y>',
    'should stringify unknowns set to objects'
  )

  t.end()

  t.test('quote', function (st) {
    st.deepEqual(
      to(x('y', {a: 'b'})),
      '<y a="b"></y>',
      'should quote attribute values with double quotes by default'
    )

    st.deepEqual(
      to(x('y', {a: 'b'}), {quote: "'"}),
      "<y a='b'></y>",
      'should quote attribute values with single quotes if `quote: "\'"`'
    )

    st.deepEqual(
      to(x('y', {a: 'b'}), {quote: '"'}),
      '<y a="b"></y>',
      "should quote attribute values with double quotes if `quote: '\"'`"
    )

    st.deepEqual(
      to(x('y', {a: "'b'"}), {quote: "'"}),
      "<y a='&#x27;b&#x27;'></y>",
      'should quote attribute values with single quotes if `quote: "\'"` even if they occur in value'
    )

    st.deepEqual(
      to(x('y', {a: '"b"'}), {quote: '"'}),
      '<y a="&#x22;b&#x22;"></y>',
      "should quote attribute values with double quotes if `quote: '\"'` even if they occur in value"
    )

    st.throws(
      function () {
        to(x('y'), {quote: '`'})
      },
      /Invalid quote ```, expected `'` or `"`/,
      'should throw on invalid quotes'
    )

    st.end()
  })

  t.test('quoteSmart', function (st) {
    st.deepEqual(
      to(x('y', {a: 'b'}), {quoteSmart: true}),
      '<y a="b"></y>',
      'should quote attribute values with primary quotes by default'
    )

    st.deepEqual(
      to(x('y', {a: "'b'"}), {quoteSmart: true}),
      '<y a="\'b\'"></y>',
      'should quote attribute values with primary quotes if the alternative occurs'
    )

    st.deepEqual(
      to(x('y', {a: "'\"b'"}), {quoteSmart: true}),
      '<y a="\'&#x22;b\'"></y>',
      'should quote attribute values with primary quotes if they occur less than the alternative'
    )

    st.deepEqual(
      to(x('y', {a: '"b\''}), {quoteSmart: true}),
      '<y a="&#x22;b\'"></y>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)'
    )

    st.deepEqual(
      to(x('y', {a: '"\'b\'"'}), {quoteSmart: true}),
      '<y a="&#x22;\'b\'&#x22;"></y>',
      'should quote attribute values with primary quotes if they occur as much as alternatives (#2)'
    )

    st.deepEqual(
      to(x('y', {a: '"b"'}), {quoteSmart: true}),
      '<y a=\'"b"\'></y>',
      'should quote attribute values with alternative quotes if the primary occurs'
    )

    st.deepEqual(
      to(x('y', {a: '"\'b"'}), {quoteSmart: true}),
      '<y a=\'"&#x27;b"\'></y>',
      'should quote attribute values with alternative quotes if they occur less than the primary'
    )

    st.end()
  })

  t.test('entities in attributes', function (st) {
    st.deepEqual(
      to(x('y', {'3<5': 'a'})),
      '<y 3&#x3C;5="a"></y>',
      'should encode entities in attribute names'
    )

    st.deepEqual(
      to(x('y', {'a\0b': 'c'})),
      '<y ab="c"></y>',
      'should strip illegal characters in attribute names'
    )

    st.deepEqual(
      to(x('y', {a: '3<5'})),
      '<y a="3&#x3C;5"></y>',
      'should encode entities in attribute values'
    )

    st.deepEqual(
      to(x('y', {a: 'b\0c'})),
      '<y a="bc"></y>',
      'should strip illegal characters in attribute values'
    )

    st.deepEqual(
      to(x('y', {'3=5': 'a'})),
      '<y 3&#x3D;5="a"></y>',
      'should encode `=` in attribute names'
    )

    st.deepEqual(
      to(x('y', {a: '3=5'})),
      '<y a="3=5"></y>',
      'should not encode `=` in attribute values'
    )

    st.end()
  })
})

function toString() {
  return 'yup'
}
