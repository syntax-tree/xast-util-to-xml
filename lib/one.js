import {all} from './all.js'
import {element} from './element.js'
import {text} from './text.js'
import {comment} from './comment.js'
import {doctype} from './doctype.js'
import {instruction} from './instruction.js'
import {cdata} from './cdata.js'
import {raw} from './raw.js'

var own = {}.hasOwnProperty

var handlers = {}

handlers.root = all
handlers.element = element
handlers.text = text
handlers.comment = comment
handlers.doctype = doctype
handlers.instruction = instruction
handlers.cdata = cdata
handlers.raw = raw

// Serialize one node.
export function one(node, config) {
  var type = node && node.type

  if (!type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, type)) {
    throw new Error('Cannot compile unknown node `' + type + '`')
  }

  return handlers[type](node, config)
}
