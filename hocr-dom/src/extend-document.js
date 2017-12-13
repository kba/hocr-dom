/**
 * ### Document.prototype
 *
 * Methods added to Document.prototype
 * 
 */
module.exports = function extendDocument(Document, options={}) {

  function log(...args) {
    if (!options.debug) return
    console.log('# ', new Date(), ...args)
  }

  /**
   * #### queryHocrAll(query)
   * 
   * - `@param {String|Object}` query Object of query parameters. If a string -> query.class
   * - `@param {String} query.tag` tag names to look for. Default '*'
   * - `@param {String} query.title` `title` attribute must contain this string
   * - `@param {String} query.clauses` String of clauses for querySelector
   * - `@param {String|Array}` class Elements with this class (if string) or any of these classes (if array)
   * - `@param {String} query.context` context element to query below. Otherwise root element of DOM.
   * - `@param {String} query.terminal` Return only hocr-elements containing no hocr-elements themselves
   * - `@param {String} query.nonTerminal` Opposite of `terminal`
   * - `@param {String} query.filter` Arbitrary filter to prune resulting element set
   * 
   */
  Document.prototype.queryHocrAll = function queryHocrAll(query={}) {

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
    log("findByOcrClass:", qs)
    let context = (query.context || this)

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
      console.log({query})
      set = set.filter(query.filter)
    }

    return Object.create(set, nodeList.prototype)
  }

  /**
   * #### queryHocr(query)
   * 
   * Find the first hOCR element matching query
   * 
   * See [Document.prototype.queryHocrAll](#documentprototypequeryhocrallquery) for options
   * 
   */
  Document.prototype.queryHocr = function queryHocr(query={}) {
    return Array.from(this.queryHocrAll(query))[0]
  }

}

