'use strict'

var one = require('./one')

module.exports = toXml

var quotationMark = '"'
var apostrophe = "'"

// Serialize the given node.
function toXml(node, options) {
  var opts = options || {}
  var quote = opts.quote || quotationMark
  var alternative = quote === quotationMark ? apostrophe : quotationMark
  var smart = opts.quoteSmart
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
    dangerous: opts.allowDangerousXml,
    close: opts.closeEmptyElements,
    tight: opts.tightClose,
    quote: quote,
    alternative: smart ? alternative : null
  })
}
