/**
 * ## HocrDOM
 */

module.exports = class HocrDOM {

  // Override prototypes
  // XXX
  static extendPrototypes({Element, Document}, options) {
    require('./extend-element')(Element, options)
    require('./extend-document')(Document, options)
    require('./extend-document')(Element, options)
    HocrDOM._initialized = true
  }


}
