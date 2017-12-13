const {JSDOM} = require('jsdom')
const {Element, Document} = require('jsdom/lib/jsdom/living')

const {HocrDOM} = require('hocr-dom')

/**
 * ## JsdomHocrParser
 */

module.exports = class JsdomHocrParser {

  constructor(options) {
    if (!HocrDOM._initialized) {
      HocrDOM.extendPrototypes({Element, Document}, options)
    }
  }

 /**
  * ## parse
  * 
  * Parse hocr documents using jsdom and return a HocrDocument
  * 
  * - `@param {String} html` HTML to parse
  * 
  */
  parse(str) {
    return new JSDOM(str).window.document
  }

}

