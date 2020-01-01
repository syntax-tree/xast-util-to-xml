'use strict'

var test = require('tape')
var u = require('unist-builder')
var to = require('..')

test('`instruction`', function(t) {
  t.deepEqual(
    to(u('instruction')),
    '<?x?>',
    'should serialize instructions without `name`'
  )

  t.deepEqual(
    to(u('instruction', {name: 'xml'})),
    '<?xml?>',
    'should serialize instructions with `name`'
  )

  t.deepEqual(
    to(u('instruction', {name: 'xml'}, 'version="1.0"')),
    '<?xml version="1.0"?>',
    'should serialize instructions with a value'
  )

  t.end()
})
