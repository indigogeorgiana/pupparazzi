const express = require('express')
const getData = require('./views/getData')
const router = express.Router()

router.get('/', (req, res) => {
  getData((err, data) => {
    if (err) {
      res.send('unable to read this file').status(500)
    } else {
      const puppyData = JSON.parse(data)
      res.render('Pupparazzi', puppyData)
    }
  })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to this file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      res.render('puppy', puppyData)
    }
  })
})

router.get('/puppies', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to this file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      res.render('./puppy', puppyData)
    }
  })
})

module.exports = router
