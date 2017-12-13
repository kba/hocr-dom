const HocrPropertyParser = require('./property-parser')

/**
 *
 * ### Element.prototype
 * 
 */

module.exports = function extendElement(Element, options={}) {

  options = Object.assign({propertyParserOptions: {}, debug: false}, options)

  const propertyParser = new HocrPropertyParser(options.propertyParserOptions)

  Object.defineProperty(Element.prototype, '_hocr', {enumerable: false, writable: true})
  Object.defineProperty(Element.prototype, '_isHocrElement', {enumerable: true, writable: true})

  /**
   * #### hocr
   * 
   * List the properties of this hOCR element as an object
   * 
   */
  Object.defineProperty(Element.prototype, 'hocr', {
    get() {
      if (!this._hocr) {
        if (!this.isHocrElement) {
          this._hocr = {}
        } else {
          this._hocr = propertyParser.parse(this.getAttribute('title'))
        }
      }
      return this._hocr
    }
  })

  /**
   * #### isHocrElement
   * 
   * `true` if this has an `ocr_*` class, `false` otherwise
   * 
   */
  Object.defineProperty(Element.prototype, 'isHocrElement', {
    get() {
      if (this._isHocrElement === undefined) {
        this._isHocrElement = !! Array.from(this.classList).find(cls => cls.startsWith('ocr'))
      }
      return this._isHocrElement
    }
  })

}
