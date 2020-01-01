'use strict'

var name = require('./name')
var escape = require('./util-escape')

module.exports = serializeProcessingInstruction

var unsafe = /\?>/g
var subset = ['>']

// Serialize a processing instruction.
function serializeProcessingInstruction(node) {
  var nodeName = name(node.name) || 'x'
  var val = escape(node.value, subset, unsafe)
  return '<?' + nodeName + (val ? ' ' + val : '') + '?>'
}
