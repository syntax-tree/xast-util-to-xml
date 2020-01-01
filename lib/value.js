'use strict'

var ccount = require('ccount')
var escape = require('./util-escape')

module.exports = serializeValue

function serializeValue(value, config) {
  var primary = config.quote
  var secondary = config.alternative
  var val = String(value)
  var quote =
    secondary && ccount(val, primary) > ccount(val, secondary)
      ? secondary
      : primary

  return quote + escape(val, ['<', '&', quote]) + quote
}
