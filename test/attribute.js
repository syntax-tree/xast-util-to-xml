import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {x} from 'xastscript'
import {toXml} from '../index.js'

test('`element` attributes', async function (t) {
  await t.test('should ignore missing attributes', async function () {
    assert.deepEqual(
      toXml(
        // @ts-expect-error: check how runtime does not fail on missing `attributes`.
        u('element', {name: 'y'}, [])
      ),
      '<y></y>'
    )
  })

  await t.test('should ignore attributes set to `null`', async function () {
    assert.deepEqual(
      toXml(u('element', {name: 'y', attributes: {a: null}}, [])),
      '<y></y>'
    )
  })

  await t.test(
    'should ignore attributes set to `undefined`',
    async function () {
      assert.deepEqual(
        toXml(u('element', {name: 'y', attributes: {a: undefined}}, [])),
        '<y></y>'
      )
    }
  )

  await t.test('should include attributes set to `NaN`', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles numbers.
      toXml(u('element', {name: 'y', attributes: {a: Number.NaN}}, [])),
      '<y a="NaN"></y>'
    )
  })

  await t.test('should include attributes set to `true`', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles booleans.
      toXml(u('element', {name: 'y', attributes: {a: true}}, [])),
      '<y a="true"></y>'
    )
  })

  await t.test('should include attributes set to a string', async function () {
    assert.deepEqual(
      toXml(u('element', {name: 'y', attributes: {a: 'b'}}, [])),
      '<y a="b"></y>'
    )
  })

  await t.test('should include attributes set to an array', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles arrays.
      toXml(u('element', {name: 'y', attributes: {a: ['b', 'c']}}, [])),
      '<y a="b,c"></y>'
    )
  })

  await t.test('should include attributes set to a number', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles objects.
      toXml(u('element', {name: 'y', attributes: {a: 1}}, [])),
      '<y a="1"></y>'
    )
  })

  await t.test('should include attributes set to `0`', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles numbers.
      toXml(u('element', {name: 'y', attributes: {a: 0}}, [])),
      '<y a="0"></y>'
    )
  })

  await t.test('should stringify unknowns set to objects', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles objects.
      toXml(u('element', {name: 'y', attributes: {a: {toString}}}, [])),
      '<y a="yup"></y>'
    )
  })

  await t.test('quote', async function (t) {
    await t.test(
      'should quote attribute values with double quotes by default',
      async function () {
        assert.deepEqual(toXml(x('y', {a: 'b'})), '<y a="b"></y>')
      }
    )

    await t.test(
      'should quote attribute values with single quotes if `quote: "\'"`',
      async function () {
        assert.deepEqual(toXml(x('y', {a: 'b'}), {quote: "'"}), "<y a='b'></y>")
      }
    )

    await t.test(
      "should quote attribute values with double quotes if `quote: '\"'`",
      async function () {
        assert.deepEqual(toXml(x('y', {a: 'b'}), {quote: '"'}), '<y a="b"></y>')
      }
    )

    await t.test(
      'should quote attribute values with single quotes if `quote: "\'"` even if they occur in value',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: "'b'"}), {quote: "'"}),
          "<y a='&#x27;b&#x27;'></y>"
        )
      }
    )

    await t.test(
      "should quote attribute values with double quotes if `quote: '\"'` even if they occur in value",
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: '"b"'}), {quote: '"'}),
          '<y a="&#x22;b&#x22;"></y>'
        )
      }
    )

    await t.test('should throw on invalid quotes', async function () {
      assert.throws(function () {
        // @ts-expect-error: check how the runtime handles incorrect quotes.
        toXml(x('y'), {quote: '`'})
      }, /Invalid quote ```, expected `'` or `"`/)
    })
  })

  await t.test('quoteSmart', async function (t) {
    await t.test(
      'should quote attribute values with primary quotes by default (`"`)',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: 'b'}), {quoteSmart: true}),
          '<y a="b"></y>'
        )
      }
    )

    await t.test(
      "should quote attribute values with primary quotes by default (`'`)",
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: 'b'}), {quote: "'", quoteSmart: true}),
          "<y a='b'></y>"
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if the alternative occurs',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: "'b'"}), {quoteSmart: true}),
          '<y a="\'b\'"></y>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if they occur less than the alternative',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: "'\"b'"}), {quoteSmart: true}),
          '<y a="\'&#x22;b\'"></y>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if they occur as much as alternatives (#1)',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: '"b\''}), {quoteSmart: true}),
          '<y a="&#x22;b\'"></y>'
        )
      }
    )

    await t.test(
      'should quote attribute values with primary quotes if they occur as much as alternatives (#2)',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: '"\'b\'"'}), {quoteSmart: true}),
          '<y a="&#x22;\'b\'&#x22;"></y>'
        )
      }
    )

    await t.test(
      'should quote attribute values with alternative quotes if the primary occurs',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: '"b"'}), {quoteSmart: true}),
          '<y a=\'"b"\'></y>'
        )
      }
    )

    await t.test(
      'should quote attribute values with alternative quotes if they occur less than the primary',
      async function () {
        assert.deepEqual(
          toXml(x('y', {a: '"\'b"'}), {quoteSmart: true}),
          '<y a=\'"&#x27;b"\'></y>'
        )
      }
    )
  })

  await t.test('entities in attributes', async function (t) {
    await t.test(
      'should encode entities in attribute names',
      async function () {
        assert.deepEqual(toXml(x('y', {'3<5': 'a'})), '<y 3&#x3C;5="a"></y>')
      }
    )

    await t.test(
      'should strip illegal characters in attribute names',
      async function () {
        assert.deepEqual(toXml(x('y', {'a\0b': 'c'})), '<y ab="c"></y>')
      }
    )

    await t.test(
      'should encode entities in attribute values',
      async function () {
        assert.deepEqual(toXml(x('y', {a: '3<5'})), '<y a="3&#x3C;5"></y>')
      }
    )

    await t.test(
      'should strip illegal characters in attribute values',
      async function () {
        assert.deepEqual(toXml(x('y', {a: 'b\0c'})), '<y a="bc"></y>')
      }
    )

    await t.test('should encode `=` in attribute names', async function () {
      assert.deepEqual(toXml(x('y', {'3=5': 'a'})), '<y 3&#x3D;5="a"></y>')
    })

    await t.test(
      'should not encode `=` in attribute values',
      async function () {
        assert.deepEqual(toXml(x('y', {a: '3=5'})), '<y a="3=5"></y>')
      }
    )
  })
})

function toString() {
  return 'yup'
}
