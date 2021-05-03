import {one} from './one.js'

var quotationMark = '"'
var apostrophe = "'"

// Serialize the given node.
export function toXml(node, options) {
  var settings = options || {}
  var quote = settings.quote || quotationMark
  var alternative = quote === quotationMark ? apostrophe : quotationMark
  var smart = settings.quoteSmart
  var value =
    node && typeof node === 'object' && 'length' in node
      ? {type: 'root', children: node}
      : node

  if (quote !== quotationMark && quote !== apostrophe) {
    throw new Error(
      'Invalid quote `' +
        quote +
        '`, expected `' +
        apostrophe +
        '` or `' +
        quotationMark +
        '`'
    )
  }

  return one(value, {
    dangerous: settings.allowDangerousXml,
    close: settings.closeEmptyElements,
    tight: settings.tightClose,
    quote,
    alternative: smart ? alternative : null
  })
}
