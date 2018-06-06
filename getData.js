const fs = require('fs')
const path = require('path')

function getData (callback) {
  const filePath = path.join(__dirname, 'data.json')
  console.log(filePath)
  fs.readFile(filePath, 'utf8', callback)
}

function changeData (callback) {
  const filePath = path.join(__dirname, 'data.json')
  console.log(filePath)
  fs.writeFIle(filePath, 'utf8', callback)
}
module.exports = getData
