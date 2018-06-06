const express = require('express')
const getData = require('./getData.js')
const changeData = require('./changeData.js')
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
  // res.send('post method')
  const name = req.body.name
  const breed = req.body.breed
  const owner = req.body.owner
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to read data file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      puppyData.name = name
      puppyData.breed = breed
      puppyData.owner = owner
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
