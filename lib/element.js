import {all} from './all.js'
import {name} from './name.js'
import {value} from './value.js'

var own = {}.hasOwnProperty

// Serialize an element.
export function element(node, config) {
  var nodeName = name(node.name)
  var content = all(node, config)
  var attributes = node.attributes || {}
  var close = content ? false : config.close
  var attrs = []
  var key
  var result

  for (key in attributes) {
    if (own.call(attributes, key)) {
      result = attributes[key]

      if (result !== null && result !== undefined) {
        attrs.push(name(key) + '=' + value(result, config))
      }
    }
  }

  return (
    '<' +
    nodeName +
    (attrs.length === 0 ? '' : ' ' + attrs.join(' ')) +
    (close ? (config.tight ? '' : ' ') + '/' : '') +
    '>' +
    content +
    (close ? '' : '</' + nodeName + '>')
  )
}
