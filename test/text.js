'use strict'

var test = require('tape')
var u = require('unist-builder')
var to = require('..')

test('`text`', function (t) {
  t.deepEqual(to(u('text', 'alpha')), 'alpha', 'should serialize `text`s')

  t.deepEqual(
    to(u('text', '3 < 5 & 8 > 13')),
    '3 &#x3C; 5 &#x26; 8 > 13',
    'should encode `text`s'
  )

  t.end()
})
