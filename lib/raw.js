import {text} from './text.js'

// Serialize raw.
export function raw(node, config) {
  return config.dangerous ? node.value : text(node, config)
}
