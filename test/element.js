'use strict'

var test = require('tape')
var x = require('xastscript')
var to = require('..')

test('`element`', function(t) {
  t.deepEqual(
    to(x('y', 'bravo')),
    '<y>bravo</y>',
    'should serialize `element`s'
  )

  t.deepEqual(
    to(x('y'), {closeEmptyElements: true}),
    '<y />',
    'should serialize with ` /` in `closeEmptyElements` mode'
  )

  t.deepEqual(
    to(x('y'), {closeEmptyElements: true, tightClose: true}),
    '<y/>',
    'should serialize with `/` in `closeEmptyElements` and `tightClose` mode'
  )

  t.end()
})
