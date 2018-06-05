const fs = require('fs')
const path = require('path')

function getFile (callback) {
  const puppyPath = path.join(__dirname, 'data.json')
  console.log(puppyPath)

  fs.readFile(puppyPath, 'utf8', callback)
}


module.exports = getFile
