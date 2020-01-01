'use strict'

var text = require('./text')

module.exports = serializeRaw

// Serialize raw.
function serializeRaw(node, config) {
  return config.dangerous ? node.value : text(node, config)
}
