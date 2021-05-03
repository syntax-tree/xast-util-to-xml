import {name} from './name.js'
import {value} from './value.js'

// Serialize a document type.
export function doctype(node, config) {
  var nodeName = name(node.name)
  var pub = node.public
  var sys = node.system
  var result = '<!DOCTYPE'

  if (nodeName !== '') {
    result += ' ' + nodeName
  }

  if (pub !== null && pub !== undefined && pub !== '') {
    result += ' PUBLIC ' + value(pub, config)
  } else if (sys !== null && sys !== undefined && sys !== '') {
    result += ' SYSTEM'
  }

  if (sys !== null && sys !== undefined && sys !== '') {
    result += ' ' + value(sys, config)
  }

  return result + '>'
}
