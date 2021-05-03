/**
 * @typedef {import('./index.js').Handle} Handle
 */

import {all} from './all.js'
import {element} from './element.js'
import {text} from './text.js'
import {comment} from './comment.js'
import {doctype} from './doctype.js'
import {instruction} from './instruction.js'
import {cdata} from './cdata.js'
import {raw} from './raw.js'

var own = {}.hasOwnProperty

var handlers = {
  root: all,
  element,
  text,
  comment,
  doctype,
  instruction,
  cdata,
  raw
}

/**
 * Serialize a node.
 *
 * @type {Handle}
 */
export function one(node, ctx) {
  var type = node && node.type

  if (!type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, type)) {
    throw new Error('Cannot compile unknown node `' + type + '`')
  }

  // @ts-ignore Hush, it works.
  return handlers[type](node, ctx)
}
