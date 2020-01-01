'use strict'

var escape = require('./util-escape')

module.exports = serializeText

var subset = ['&', '<']

// Serialize a text.
function serializeText(node) {
  return escape(node.value, subset)
}
