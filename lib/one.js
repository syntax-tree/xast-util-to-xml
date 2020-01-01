'use strict'

module.exports = one

var own = {}.hasOwnProperty

var handlers = {}

handlers.root = require('./all')
handlers.element = require('./element')
handlers.text = require('./text')
handlers.comment = require('./comment')
handlers.doctype = require('./doctype')
handlers.instruction = require('./instruction')
handlers.cdata = require('./cdata')
handlers.raw = require('./raw')

// Serialize one node.
function one(node, config) {
  var type = node && node.type

  if (!type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, type)) {
    throw new Error('Cannot compile unknown node `' + type + '`')
  }

  return handlers[type](node, config)
}
