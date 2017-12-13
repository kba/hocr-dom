# HocrDOM

> Extend DOM to handle hOCR

[![CircleCI](https://circleci.com/gh/kba/hocr-dom.svg?style=svg)](https://circleci.com/gh/kba/hocr-dom)

<!-- BEGIN-MARKDOWN-TOC -->
* [hocr-dom](#hocr-dom)
* [hocr-dom-jsdom](#hocr-dom-jsdom)

<!-- END-MARKDOWN-TOC -->

## hocr-dom

The main package, contains code for querying hOCR elements and parsing / accesing properties.

See the [README](./hocr-dom/README.md) for API docs.

In short, in the browser, you will only need

```js
HocrDOM.extendPrototypes(window)
```

After this, you can use `document.queryHocrAll` on document and elements, as
well as access properties via their `hocr` property.

## hocr-dom-jsdom

Contains a browser-independent HTML parser with built-in hOCR support, thanks
to [jsdom](https://github.com/tmpvar/jsdom).
