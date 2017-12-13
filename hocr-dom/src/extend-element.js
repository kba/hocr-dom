const HocrPropertyParser = require('./property-parser')

module.exports = function extendElement(Element, options={}) {

  options = Object.assign({propertyParserOptions: {}, debug: false}, options)

  const propertyParser = new HocrPropertyParser(options.propertyParserOptions)

  Object.defineProperty(Element.prototype, '_hocr', {enumerable: false, writable: true})
  Object.defineProperty(Element.prototype, '_isHocrElement', {enumerable: true, writable: true})

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

  Object.defineProperty(Element.prototype, 'isHocrElement', {
    get() {
      if (this._isHocrElement === undefined) {
        this._isHocrElement = !! Array.from(this.classList).find(cls => cls.startsWith('ocr'))
      }
      return this._isHocrElement
    }
  })

}
