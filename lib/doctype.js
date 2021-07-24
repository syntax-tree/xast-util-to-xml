/**
 * @typedef {import('./index.js').Handle} Handle
 * @typedef {import('./index.js').Doctype} Doctype
 */

import {name} from './name.js'
import {value} from './value.js'

/**
 * Serialize a doctype.
 *
 * @type {Handle}
 * @param {Doctype} node
 */
export function doctype(node, ctx) {
  const nodeName = name(node.name)
  const pub = node.public
  const sys = node.system
  let result = '<!DOCTYPE'

  if (nodeName !== '') {
    result += ' ' + nodeName
  }

  if (pub !== null && pub !== undefined && pub !== '') {
    result += ' PUBLIC ' + value(pub, ctx)
  } else if (sys !== null && sys !== undefined && sys !== '') {
    result += ' SYSTEM'
  }

  if (sys !== null && sys !== undefined && sys !== '') {
    result += ' ' + value(sys, ctx)
  }

  return result + '>'
}
