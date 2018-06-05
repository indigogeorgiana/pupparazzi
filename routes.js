const express = require('express')
const getData = require('./getData.js')
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

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to read data file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      res.render('./puppies/view', puppyData)
    }
  })
})

module.exports = router
