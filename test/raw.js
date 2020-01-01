'use strict'

var test = require('tape')
var u = require('unist-builder')
var to = require('..')

test('`raw`', function(t) {
  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>')),
    '&#x3C;script>alert("XSS!")&#x3C;/script>',
    'should encode `raw`s'
  )

  t.deepEqual(
    to(u('raw', '<script>alert("XSS!")</script>'), {allowDangerousXml: true}),
    '<script>alert("XSS!")</script>',
    'should not encode `raw`s in `allowDangerousXml` mode'
  )

  t.end()
})
