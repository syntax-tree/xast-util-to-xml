import {escape} from './util-escape.js'
import {name} from './name.js'

var unsafe = /\?>/g
var subset = ['>']

// Serialize a processing instruction.
export function instruction(node) {
  var nodeName = name(node.name) || 'x'
  var result = escape(node.value, subset, unsafe)
  return '<?' + nodeName + (result ? ' ' + result : '') + '?>'
}
