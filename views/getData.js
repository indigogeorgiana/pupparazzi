const fs = require('fs')
const path = require('path')

module.exports = getData

function getData (callback) {
  const filePath = path.join(__dirname, 'data.json')
  fs.readFile(filePath, 'utf8', callback)
}
