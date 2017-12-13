const HocrPropertyParser = require('./property-parser')

/**
 * ### HocrDOM
 * 
 */

function log(options, ...args) {
  if (!options.debug) return
  console.log('# ', new Date(), ...args)
}

const defaultPropertyParser = new HocrPropertyParser()

class HocrDOM {

  /**
   * #### Options
   * 
   * All boolean options are `false` by default
   * - `{Boolean} debug` Whether to log debug output
   * - `{Boolean} allowUnknown` Whether to silently ignore properties not in the spec
   * - `{Boolean} allowInvalidNumbers` Whether to silently ignore invalid number (wrong type e.g.)
   * - `{Boolean} disableCardinalityChecks` Whether to silently ignore invalid argument cardinality
   * - `{PropertyParser} propertyParser` PropertyParser instance to use. Static parser with default values used otherwise
   * 
   */

  /**
   * #### `HocrDOM.isHocrElement(context, options, cache)`
   * 
   * `true` if this has an `ocr_*` class, `false` otherwise
   * 
   * - `@param {Document|Element}` context Context element
   * - `@param {Object}` options See [Options](#options)
   * - `@param {Object}` cache If provided, will cache the properties in this object with key `_hocr`
   * 
   */
  static isHocrElement(context, options, cache={}) {
    if (cache._isHocrElement === undefined) {
      cache._isHocrElement = !! Array.from(context.classList).find(cls => cls.startsWith('ocr'))
    }
    return cache._isHocrElement
  }

  /**
   * #### `HocrDOM.getHocrProperties(context, options, cache)`
   * 
   * List the properties of this hOCR element as an object
   *
   * - `@param {Document|Element}` context Context element
   * - `@param {Object}` options See [Options](#options)
   * - `@param {Object}` cache If provided, will cache the properties in this object with key `_hocr`
   * 
   */
  static getHocrProperties(context, options={}, cache={}) {
    let {propertyParser} = options
    if (!propertyParser) propertyParser = defaultPropertyParser
    if (!cache._hocr) {
      if (!HocrDOM.isHocrElement(context, options, cache)) {
        cache._hocr = {}
      } else {
        cache._hocr = propertyParser.parse(context.getAttribute('title'))
      }
    }
    return cache._hocr
  }

  /**
   * #### `HocrDOM.queryHocr(context, query, options)`
   * 
   * Find the first hOCR element matching query
   * 
   * See [queryHocrAll](#queryhocrallquery) for options
   * 
   */
  static queryHocr(...args) {
    return Array.from(HocrDOM.queryHocrAll(...args))[0]
  }

  /**
   * #### `HocrDOM.queryHocrAll(context, query, options)`
   * 
   * - `@param {Document|Element}` context Context element
   * - `@param {String|Object}` query Object of query parameters. If a string -> query.class
   *   - `@param {String} query.tag` tag names to look for. Default '*'
   *   - `@param {String} query.title` `title` attribute must contain this string
   *   - `@param {String} query.clauses` String of clauses for querySelector
   *   - `@param {String|Array}` class Elements with this class (if string) or any of these classes (if array)
   *   - `@param {String} query.context` context element to query below. Otherwise root element of DOM.
   *   - `@param {String} query.terminal` Return only hocr-elements containing no hocr-elements themselves
   *   - `@param {String} query.nonTerminal` Opposite of `terminal`
   *   - `@param {String} query.filter` Arbitrary filter to prune resulting element set
   * 
   */
  static queryHocrAll(context, query={}, options={}) {

    if (Array.isArray(query) || typeof query === 'string') query = {class: query}
    query.tag = (query.tag || '*')
    query.clauses = (query.clauses || '')

    // Return only hocr-elements with a bbox
    if (query.title) query.clauses += `[title*="${query.title}"]`

    // Return specific ocr_* / ocrx_* classes
    query.class = (query.class || '')
    if (typeof query.class === 'string') query.class = [query.class]

    // Build querySelectorAll query
    let qs = query.class.map(function(cls) {
      if (cls.indexOf('ocr') === 0) return cls
      if (cls === '') return 'ocr'
      if (cls.indexOf('x_') !== 0) return `ocr_${cls}`
      return `ocr${cls}`
    }).map(function(cls) {
      return `${query.tag}[class^="${cls}"]${query.clauses}`
    }).join(',')

    log(options, "findByOcrClass:", qs)

    // let set = Array.prototype.slice.call(context.querySelectorAll(qs))
    const nodeList = context.querySelectorAll(qs)
    let set = Array.from(nodeList)

    if (query.terminal) {
      set = set.filter(function(el) {
        if (!el.querySelector('*[class^="ocr"]')) return el
      })
    }
    if (query.nonTerminal) {
      set = set.filter(function(el) {
        if (el.querySelector('*[class^="ocr"]')) return el
      })
    }

    // Arbitrary filter function
    if (query.filter) {
      log(options, {query})
      set = set.filter(query.filter)
    }

    return Object.create(set, nodeList.prototype)
  }

  /**
   * #### `HocrDOM.extendPrototypes({Element, Document}, options)`
   * 
   * Extend the prototypes of `Element` and `Document` with hOCR-specific
   * methods and properties.
   *
   * ##### `el.queryHocr(query, options)`
   * 
   * Same as [`HocrDOM.queryHocr`]() but with context set to `el`
   * 
   * ##### `el.queryHocrAll(query, options)`
   * 
   * Same as [`HocrDOM.queryHocrAll`]() but with context set to `el`
   * 
   * ##### `el.isHocrElement`
   * 
   * Property containing whether this is an hOCR element
   * 
   * ##### `el.hocr`
   * 
   * Property containing the hOCR properties
   * 
   */
  static extendPrototypes({Element, Document}, options) {

    ;[Element.prototype, Document.prototype].forEach(p => {
      ;['queryHocr', 'queryHocrAll'].forEach(fn => {
        p[fn] = function (query={}, options) {
          const context = (query.context || this)
          return HocrDOM[fn](context, query, options)
        }
      })

      Object.defineProperty(p, '_hocr', {enumerable: false, writable: true})
      Object.defineProperty(p, 'hocr', {get() {return HocrDOM.getHocrProperties(this, options, this)}})

      Object.defineProperty(p, '_isHocrElement', {enumerable: true, writable: true})
      Object.defineProperty(p, 'isHocrElement', {get() {return HocrDOM.isHocrElement(this, options, this)}})
    })

    HocrDOM._initialized = true
  }


}

module.exports = HocrDOM
