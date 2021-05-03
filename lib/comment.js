import {escape} from './util-escape.js'

// Serialize a comment.
export function comment(node) {
  return '<!--' + escape(node.value, ['-']) + '-->'
}
