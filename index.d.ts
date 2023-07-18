import type {Data, Literal} from 'xast'

export type {Options, Quote} from './lib/index.js'
export {toXml} from './lib/index.js'

/**
 * Raw.
 */
export interface Raw extends Literal {
  /**
   * Node type of raw.
   */
  type: 'raw'

  /**
   * Data associated with the xast raw.
   */
  data?: RawData | undefined
}

/**
 * Info associated with xast raw nodes by the ecosystem.
 */
export interface RawData extends Data {}

// Add nodes to tree.
declare module 'xast' {
  interface ElementContentMap {
    raw: Raw
  }

  interface RootContentMap {
    raw: Raw
  }
}
