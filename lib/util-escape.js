'use strict'

var entities = require('stringify-entities/light')

module.exports = escape

var noncharacter = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g

function escape(value, subset, unsafe) {
  var result = clean(value)

  return unsafe ? result.replace(unsafe, encode) : encode(result)

  function encode($0) {
    return entities($0, {subset: subset})
  }
}

function clean(value) {
  return String(value || '').replace(noncharacter, '')
}
