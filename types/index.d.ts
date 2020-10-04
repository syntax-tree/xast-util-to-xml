// TypeScript Version: 3.0

import {Node} from 'xast'

declare namespace toXml {
  interface Options {
    /**
     * Preferred quote to use.
     *
     * @default '"'
     */
    quote?: '"' | "'"

    /**
     * Use the other quote if that results in less bytes.
     *
     * @default false
     */
    quoteSmart?: boolean

    /**
     * Close elements without any content with slash (/) on the opening tag
     * instead of an end tag: `<circle />` instead of `<circle></circle>`.
     * See `tightClose` to control whether a space is used before the slash.
     *
     * @default false
     */
    closeEmptyElements?: boolean

    /**
     * Do not use an extra space when closing self-closing elements:
     * `<circle/>` instead of `<circle />`.
     *
     * @default false
     */
    tightClose?: boolean

    /**
     * Allow `raw` nodes and insert them as raw XML. When falsey, encodes `raw` nodes.
     * Only set this if you completely trust the content!
     *
     * @default false
     */
    allowDangerousXml?: boolean
  }
}

/**
 * Serialize the given xast tree to xml.
 *
 * @param tree Tree or list of nodes
 * @param options Options
 */
declare function toXml(tree: Node | Node[], options?: toXml.Options): string

export = toXml
