import {escape} from './util-escape.js'

var unsafe = /]]>/g
var subset = ['>']

// Serialize a CDATA section.
export function cdata(node) {
  return '<![CDATA[' + escape(node.value, subset, unsafe) + ']]>'
}
