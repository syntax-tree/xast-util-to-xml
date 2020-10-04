import toXml = require('xast-util-to-xml')
import {Element} from 'xast'

const xmlns = 'http://www.sitemaps.org/schemas/sitemap/0.9'
const element: Element = {
  type: 'element',
  name: 'urlset',
  attributes: {xmlns},
  children: []
}

toXml(element) // $ExpectType string
toXml([element]) // $ExpectType string
toXml(element, {allowDangerousXml: true}) // $ExpectType string
toXml(element, {quote: "'"}) // $ExpectType string
toXml(element, {quoteSmart: true}) // $ExpectType string
toXml(element, {closeEmptyElements: true}) // $ExpectType string
toXml(element, {closeEmptyElements: true, tightClose: true}) // $ExpectType string

toXml() // $ExpectError
toXml(false) // $ExpectError
toXml(element, element) // $ExpectError
