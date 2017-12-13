const tap = require('tap')
const JsdomHocrParser = require('../src/jsdom-parser')
const parser = new JsdomHocrParser({debug: false})
const {readSample} = require('./lib')

tap.test('Document.prototype.queryHocrAll', t => {
  t.plan(8)
  const dom = parser.parse(readSample('1.1/060.hocr'))
  t.equals(dom.querySelectorAll('*').length, 432, '432 elements total')
  t.equals(dom.queryHocrAll().length, 406, '406 hocr elements')
  t.equals(dom.queryHocrAll('page').length, 1, '1 page element')
  t.equals(dom.queryHocrAll('line').length, 45, '45 line elements')
  t.equals(dom.queryHocrAll('x_word').length, 338, '338 x_word elements')
  t.equals(dom.queryHocrAll(['page', 'line', 'x_word']).length, 384, '384 page,line,x_word')
  t.equals(dom.queryHocrAll({terminal: true}).length, 338, '338 terminal')
  t.equals(dom.queryHocrAll({nonTerminal: true}).length, 68, '68 non-terminal')
})

tap.test('Document.prototype.queryHocr', t => {
  t.plan(1)
  const dom = parser.parse(readSample('1.1/060.hocr'))
  t.ok(dom.queryHocr('page'), 'Found a page')
})

tap.test('Element.prototype.queryHocrAll', t => {
  t.plan(8)
  const dom = parser.parse(readSample('1.1/060.hocr')).body
  t.equals(dom.querySelectorAll('*').length, 425, '425 elements total')
  t.equals(dom.queryHocrAll().length, 406, '406 hocr elements')
  t.equals(dom.queryHocrAll('page').length, 1, '1 page element')
  t.equals(dom.queryHocrAll('line').length, 45, '45 line elements')
  t.equals(dom.queryHocrAll('x_word').length, 338, '338 x_word elements')
  t.equals(dom.queryHocrAll(['page', 'line', 'x_word']).length, 384, '384 page,line,x_word')
  t.equals(dom.queryHocrAll({terminal: true}).length, 338, '338 terminal')
  t.equals(dom.queryHocrAll({nonTerminal: true}).length, 68, '68 non-terminal')
})

tap.test('Element.prototype.queryHocr', t => {
  t.plan(1)
  const dom = parser.parse(readSample('1.1/060.hocr')).body
  t.ok(dom.queryHocr('page'), 'Found a page')
})

tap.test('Element.prototype.hocr', t => {
  t.plan(2)
  const dom = parser.parse(readSample('1.1/060.hocr'))
  const el = dom.queryHocr('page')
  t.equals(el.isHocrElement, true, 'element.isHocrElement == true')
  t.deepEquals(el.hocr, {image: '060.tif', bbox: [0, 0, 1112, 1777], ppageno: 0}, 'props parsed correctly')
})
