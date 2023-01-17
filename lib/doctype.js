/**
 * @typedef {import('xast').Doctype} Doctype
 * @typedef {import('./index.js').State} State
 */

import {name} from './name.js'
import {value} from './value.js'

/**
 * Serialize a doctype.
 *
 * @param {Doctype} node
 *   xast doctype node.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized XML.
 */
export function doctype(node, state) {
  const nodeName = name(node.name)
  const pub = node.public
  const sys = node.system
  let result = '<!DOCTYPE'

  if (nodeName !== '') {
    result += ' ' + nodeName
  }

  if (pub) {
    result += ' PUBLIC ' + value(pub, state)
  } else if (sys) {
    result += ' SYSTEM'
  }

  if (sys) {
    result += ' ' + value(sys, state)
  }

  return result + '>'
}
