'use strict'

var ccount = require('ccount')
var escape = require('./util-escape')

module.exports = serializeValue

function serializeValue(value, config) {
  var primary = config.quote
  var secondary = config.alternative
  var result = String(value)
  var quote =
    secondary && ccount(result, primary) > ccount(result, secondary)
      ? secondary
      : primary

  return quote + escape(result, ['<', '&', quote]) + quote
}
