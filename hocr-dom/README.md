# hocr-dom

<!-- BEGIN-MARKDOWN-TOC -->
* [API](#api)
	* [HocrDOM](#hocrdom)
		* [`HocrDOM.extendPrototypes({Element, Document}, options)`](#hocrdomextendprototypes-element-document--options)
	* [Document.prototype](#documentprototype)
		* [queryHocrAll(query)](#queryhocrallquery)
		* [queryHocr(query)](#queryhocrquery)
	* [Element.prototype](#elementprototype)
		* [hocr](#hocr)
		* [isHocrElement](#ishocrelement)

<!-- END-MARKDOWN-TOC -->

## API

<!-- BEGIN-RENDER ./src/dom.js -->
### HocrDOM

#### `HocrDOM.extendPrototypes({Element, Document}, options)`

<!-- END-RENDER -->

<!-- BEGIN-RENDER ./src/extend-document.js -->
### Document.prototype
Methods added to Document.prototype

#### queryHocrAll(query)

- `@param {String|Object}` query Object of query parameters. If a string -> query.class
- `@param {String} query.tag` tag names to look for. Default '*'
- `@param {String} query.title` `title` attribute must contain this string
- `@param {String} query.clauses` String of clauses for querySelector
- `@param {String|Array}` class Elements with this class (if string) or any of these classes (if array)
- `@param {String} query.context` context element to query below. Otherwise root element of DOM.
- `@param {String} query.terminal` Return only hocr-elements containing no hocr-elements themselves
- `@param {String} query.nonTerminal` Opposite of `terminal`
- `@param {String} query.filter` Arbitrary filter to prune resulting element set

#### queryHocr(query)

Find the first hOCR element matching query

See [Document.prototype.queryHocrAll](#documentprototypequeryhocrallquery) for options

<!-- END-RENDER -->

<!-- BEGIN-RENDER ./src/extend-element.js -->
### Element.prototype

#### hocr

List the properties of this hOCR element as an object

#### isHocrElement

`true` if this has an `ocr_*` class, `false` otherwise

<!-- END-RENDER -->
