const fs = require('fs')
const path = require('path')

function getFile (callback) {
  const puppyPath = path.join(__dirname, 'data.json')

  fs.readFile(puppyPath, 'utf8', callback)
}

funtion writeToFile () {



module.exports = {
  getFile
  // writeToFile
}
