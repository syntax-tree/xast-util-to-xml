'use strict'

var entities = require('stringify-entities')

module.exports = escape

var noncharacter = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g

function escape(value, subset, unsafe) {
  var val = clean(value)

  return unsafe ? val.replace(unsafe, encode) : encode(val)

  function encode($0) {
    return entities($0, {subset: subset})
  }
}

function clean(value) {
  return String(value || '').replace(noncharacter, '')
}
