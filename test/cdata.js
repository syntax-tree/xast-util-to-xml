'use strict'

var test = require('tape')
var u = require('unist-builder')
var to = require('..')

test('`cdata`', function(t) {
  t.deepEqual(
    to(u('cdata', '3 < 5 & 8 > 13')),
    '<![CDATA[3 < 5 & 8 > 13]]>',
    'should not encode `cdata`s'
  )

  t.deepEqual(
    to(u('cdata', '3 ]]> 5')),
    '<![CDATA[3 ]]&#x3E; 5]]>',
    'should encode cdata otherwise closing `cdata`s'
  )

  t.end()
})
