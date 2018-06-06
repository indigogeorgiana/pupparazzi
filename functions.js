const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

function getData (cb) {
  const filePath = path.join(__dirname, 'data.json')
  fs.readFile(filePath, 'utf8', cb)
}


function writeData (newString, cb) {
  const filePath = path.join(__dirname, 'data.json')
  fs.writeFile(filePath, newString, 'utf8', cb)
}


module.exports = {
  getData,
  writeData
}