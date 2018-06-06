const express = require('express')
const getData = require('../getData.js')
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/puppies')
})

router.get('/puppies', (req, res) => {
  getData((err, data) => {
    if (err) {
      res.send('unable to read data file')
    } else {
      const puppyData = JSON.parse(data)
      res.render('./puppies/index', puppyData)
    }
  })
})



module.exports = router
