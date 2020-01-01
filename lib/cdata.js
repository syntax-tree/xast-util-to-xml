'use strict'

var escape = require('./util-escape')

module.exports = serializeCdataSection

var unsafe = /]]>/g
var subset = ['>']

// Serialize a CDATA section.
function serializeCdataSection(node) {
  return '<![CDATA[' + escape(node.value, subset, unsafe) + ']]>'
}
