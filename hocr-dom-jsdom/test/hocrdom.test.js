const tap = require('tap')
const {JSDOM} = require('jsdom')
const {HocrDOM} = require('hocr-dom')
console.log(HocrDOM)
const {readSample} = require('./lib')

tap.test('HocrDOM.queryHocrAll', t => {
  t.plan(8)
  const dom = new JSDOM(readSample('1.1/060.hocr')).window.document
  t.equals(dom.querySelectorAll('*').length, 432, '432 elements total')
  t.equals(HocrDOM.queryHocrAll(dom).length, 406, '406 hocr elements')
  t.equals(HocrDOM.queryHocrAll(dom, 'page').length, 1, '1 page element')
  t.equals(HocrDOM.queryHocrAll(dom, 'line').length, 45, '45 line elements')
  t.equals(HocrDOM.queryHocrAll(dom, 'x_word').length, 338, '338 x_word elements')
  t.equals(HocrDOM.queryHocrAll(dom, ['page', 'line', 'x_word']).length, 384, '384 page,line,x_word')
  t.equals(HocrDOM.queryHocrAll(dom, {terminal: true}).length, 338, '338 terminal')
  t.equals(HocrDOM.queryHocrAll(dom, {nonTerminal: true}).length, 68, '68 non-terminal')
})

tap.test('HocrDOM.queryHocr', t => {
  t.plan(1)
  const dom = new JSDOM(readSample('1.1/060.hocr')).window.document
  t.ok(HocrDOM.queryHocr(dom, 'page'), 'Found a page')
})

tap.test('HocrDOM.hocr', t => {
  t.plan(2)
  const dom = new JSDOM(readSample('1.1/060.hocr')).window.document
  const el = HocrDOM.queryHocr(dom, 'page')
  t.equals(HocrDOM.isHocrElement(el),  true, 'element.isHocrElement == true')
  t.deepEquals(HocrDOM.getHocrProperties(el),  {image: '060.tif', bbox: [0, 0, 1112, 1777], ppageno: 0}, 'props parsed correctly')
})

