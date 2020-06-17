'use strict'

var one = require('./one')

module.exports = toXml

var quotationMark = '"'
var apostrophe = "'"

// Serialize the given node.
function toXml(node, options) {
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
    quote: quote,
    alternative: smart ? alternative : null
  })
}
