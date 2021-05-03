import {escape} from './util-escape.js'

var subset = ['&', '<']

// Serialize a text.
export function text(node) {
  return escape(node.value, subset)
}
