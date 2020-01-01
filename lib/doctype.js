'use strict'

var name = require('./name')
var value = require('./value')

module.exports = serializeDocumentType

// Serialize a document type.
function serializeDocumentType(node, config) {
  var nodeName = name(node.name)
  var pub = node.public
  var sys = node.system
  var val = '<!DOCTYPE'

  if (nodeName !== '') {
    val += ' ' + nodeName
  }

  if (pub !== null && pub !== undefined && pub !== '') {
    val += ' PUBLIC ' + value(pub, config)
  } else if (sys !== null && sys !== undefined && sys !== '') {
    val += ' SYSTEM'
  }

  if (sys !== null && sys !== undefined && sys !== '') {
    val += ' ' + value(sys, config)
  }

  return val + '>'
}
