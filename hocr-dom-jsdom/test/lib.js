const fs = require('fs')

function readSample(path) {
  return fs.readFileSync(`${__dirname}/ocr-fileformat-samples/samples/hocr/${path}`)
}

module.exports = {readSample}
