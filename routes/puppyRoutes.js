const express = require('express')
const getData = require('../getData.js')
const changeData = require('../changeData.js')
const router = express.Router()


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

router.get('/puppies/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to read data file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      res.render('./puppies/edit', puppyData)
    }
  })
})

router.post('/puppies/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to read data file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      puppyData.name = req.body.name
      puppyData.breed = req.body.breed
      puppyData.owner = req.body.owner
      const newData = JSON.stringify(puppiesData, null, 2)
      changeData(newData, (err) => {
        if (err) {
          res.send('unable to save the file').status(500)
        } else {
          res.redirect('/puppies/' + id)
        }
      })
    }
  })
})

module.exports = router
