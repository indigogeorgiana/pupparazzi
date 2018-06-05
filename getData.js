const fs = require('fs')
const path = require('path')

function getData (callback) {
  const filePath = path.join(__dirname, 'data.json')
  fs.readFile(filePath, 'utf8', callback)
}

module.exports = getData
