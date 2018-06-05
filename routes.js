const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

// get puppies
router.get('/', (req, res) => {
  getData((err, data) => {
    if (err) {
      return res.status(500).send('error')
    } else {
      const pupData = JSON.parse(data)

      res.render('./puppies/index', pupData)
    }
  })
})
function getData (callback) {
  const filePath = path.join(__dirname, 'data.json')
  fs.readFile(filePath, 'utf8', callback)
}

router.get('/', (req, res) => {
  res.send('pupperazzi')
})
module.exports = router
