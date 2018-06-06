const fs = require('fs')
const path = require('path')

function changeData (newData, callback) {
  const filePath = path.join(__dirname, 'data.json')
  fs.writeFile(filePath, newData, 'utf8', callback)
}

module.exports = changeData
