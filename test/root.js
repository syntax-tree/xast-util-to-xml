'use strict'

var test = require('tape')
var x = require('xastscript')
var u = require('unist-builder')
var to = require('..')

test('`root`', function (t) {
  t.deepEqual(
    to(
      u('root', [u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')])
    ),
    'alpha <y>bravo</y> charlie',
    'should serialize `root`s'
  )

  t.deepEqual(
    to([u('text', 'alpha '), x('y', 'bravo'), u('text', ' charlie')]),
    'alpha <y>bravo</y> charlie',
    'should serialize a list of nodes'
  )

  t.end()
})
