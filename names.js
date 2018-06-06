const fs = require('fs')
const path = require('path')

function getNames (callback) {
  const filePath = path.join(__dirname, 'names.json')
  fs.readFile(filePath, 'utf8', callback)
}

function writeNames (nameString, callback) {
  const filePath = path.join(__dirname, 'names.json')
  fs.writeFile(filePath, nameString, 'utf8', callback)
}

module.exports = {
  getNames,
  writeNames
}
