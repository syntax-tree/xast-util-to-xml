import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {toXml} from 'xast-util-to-xml'

test('`doctype`', async function (t) {
  await t.test('should serialize doctypes without `name`', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how the runtime handles no `name` field.
      toXml(u('doctype')),
      '<!DOCTYPE>'
    )
  })

  await t.test('should serialize doctypes with `name`', async function () {
    assert.deepEqual(toXml(u('doctype', {name: 'html'})), '<!DOCTYPE html>')
  })

  await t.test(
    'should serialize doctypes with a public identifier',
    async function () {
      assert.deepEqual(
        toXml(
          u('doctype', {
            name: 'html',
            public: '-//W3C//DTD XHTML 1.0 Transitional//EN'
          })
        ),
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">'
      )
    }
  )

  await t.test(
    'should serialize doctypes with a system identifier',
    async function () {
      assert.deepEqual(
        toXml(u('doctype', {name: 'html', system: 'about:legacy-compat'})),
        '<!DOCTYPE html SYSTEM "about:legacy-compat">'
      )
    }
  )

  await t.test(
    'should serialize doctypes with both identifiers',
    async function () {
      assert.deepEqual(
        toXml(
          u('doctype', {
            name: 'html',
            public: '-//W3C//DTD HTML 4.01//',
            system: 'http://www.w3.org/TR/html4/strict.dtd'
          })
        ),
        '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//" "http://www.w3.org/TR/html4/strict.dtd">'
      )
    }
  )

  await t.test('should quote smartly (1)', async function () {
    assert.deepEqual(
      toXml(u('doctype', {name: 'html', public: 'taco"'})),
      '<!DOCTYPE html PUBLIC "taco&#x22;">'
    )
  })

  await t.test('should quote smartly (2)', async function () {
    assert.deepEqual(
      toXml(u('doctype', {name: 'html', public: 'taco"'}), {quoteSmart: true}),
      "<!DOCTYPE html PUBLIC 'taco\"'>"
    )
  })

  await t.test('should quote smartly (3)', async function () {
    assert.deepEqual(
      toXml(u('doctype', {name: 'html', public: '"ta\'co"'}), {
        quoteSmart: true
      }),
      '<!DOCTYPE html PUBLIC \'"ta&#x27;co"\'>'
    )
  })
})
