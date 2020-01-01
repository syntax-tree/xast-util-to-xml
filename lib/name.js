'use strict'

var escape = require('./util-escape')

module.exports = serializeName

var subset = ['\t', '\n', ' ', '"', '&', "'", '/', '<', '=', '>']

function serializeName(value) {
  return escape(value, subset)
}
