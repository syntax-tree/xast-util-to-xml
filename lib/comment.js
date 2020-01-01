'use strict'

var escape = require('./util-escape')

module.exports = serializeComment

// Serialize a comment.
function serializeComment(node) {
  return '<!--' + escape(node.value, ['-']) + '-->'
}
