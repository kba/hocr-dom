# hocr-dom

<!-- BEGIN-MARKDOWN-TOC -->
* [API](#api)
	* [HocrDOM](#hocrdom)
		* [`HocrDOM.isHocrElement(context, options, cache)`](#hocrdomishocrelementcontext-options-cache)
		* [`HocrDOM.getHocrProperties(context, options, cache)`](#hocrdomgethocrpropertiescontext-options-cache)
		* [`HocrDOM.queryHocr(context, query, options)`](#hocrdomqueryhocrcontext-query-options)
		* [`HocrDOM.queryHocrAll(context, query, options)`](#hocrdomqueryhocrallcontext-query-options)
		* [`HocrDOM.extendPrototypes({Element, Document}, options)`](#hocrdomextendprototypes-element-document--options)
			* [`el.queryHocr(query, options)`](#elqueryhocrquery-options)
			* [`el.queryHocrAll(query, options)`](#elqueryhocrallquery-options)
			* [`el.isHocrElement`](#elishocrelement)
			* [`el.hocr`](#elhocr)
	* [PropertyParser](#propertyparser)
		* [`new HocrPropertyParser(opts)`](#new-hocrpropertyparseropts)
		* [`parse(str)`](#parsestr)

<!-- END-MARKDOWN-TOC -->

## API

<!-- BEGIN-RENDER ./src/dom.js -->
### HocrDOM

#### `HocrDOM.isHocrElement(context, options, cache)`

`true` if this has an `ocr_*` class, `false` otherwise

- `@param {Document|Element}` context Context element
- `@param {Object}` options See [Options](#options)
- `@param {Object}` cache If provided, will cache the properties in this object with key `_hocr`

#### `HocrDOM.getHocrProperties(context, options, cache)`

List the properties of this hOCR element as an object
- `@param {Document|Element}` context Context element
- `@param {Object}` options See [Options](#options)
- `@param {Object}` cache If provided, will cache the properties in this object with key `_hocr`

#### `HocrDOM.queryHocr(context, query, options)`

Find the first hOCR element matching query

See [queryHocrAll](#queryhocrallquery) for options

#### `HocrDOM.queryHocrAll(context, query, options)`

- `@param {Document|Element}` context Context element
- `@param {String|Object}` query Object of query parameters. If a string -> query.class
  - `@param {String} query.tag` tag names to look for. Default '*'
  - `@param {String} query.title` `title` attribute must contain this string
  - `@param {String} query.clauses` String of clauses for querySelector
  - `@param {String|Array}` class Elements with this class (if string) or any of these classes (if array)
  - `@param {String} query.context` context element to query below. Otherwise root element of DOM.
  - `@param {String} query.terminal` Return only hocr-elements containing no hocr-elements themselves
  - `@param {String} query.nonTerminal` Opposite of `terminal`
  - `@param {String} query.filter` Arbitrary filter to prune resulting element set

#### `HocrDOM.extendPrototypes({Element, Document}, options)`

Extend the prototypes of `Element` and `Document` with hOCR-specific
methods and properties.
##### `el.queryHocr(query, options)`

Same as [`HocrDOM.queryHocr`]() but with context set to `el`

##### `el.queryHocrAll(query, options)`

Same as [`HocrDOM.queryHocrAll`]() but with context set to `el`

##### `el.isHocrElement`

Property containing whether this is an hOCR element

##### `el.hocr`

Property containing the hOCR properties

<!-- END-RENDER -->

<!-- BEGIN-RENDER ./src/property-parser.js -->
### PropertyParser

#### `new HocrPropertyParser(opts)`

- `@param {Object} opts` All options are `false` by default
  - `@param {Object} opts.debug` Whether to log debug output
  - `@param {Object} opts.allowUnknown` Whether to silently ignore properties not in the spec
  - `@param {Object} opts.allowInvalidNumbers` Whether to silently ignore invalid number (wrong type e.g.)
  - `@param {Object} opts.disableCardinalityChecks` Whether to silently ignore invalid argument cardinality

#### `parse(str)`

Tokenize and Parse the hOCR properties in a title string

<!-- END-RENDER -->
