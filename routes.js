const express = require('express')
const getData = require('./getData.js')
const names = require('./names.js')

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/puppies')
}
)

router.get('/puppies', (req, res) => {
  getData(getPuppies)
  function getPuppies (err, data) {
    if (err) {
      res.send('unable to read this file').status(500)
    } else {
      const puppyData = JSON.parse(data)
      res.render('./puppies/index', puppyData)
    }
  }
})

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to this file').status(500)
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
      res.send('unable to read id file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      res.render('puppies/edit', puppyData)
    }
  })
})

router.post('/puppies/:id', function (req, res) {
  const id = Number(req.params.id)
  const name = req.body.name
  const breed = req.body.breed
  const owner = req.body.owner

  getData(getPuppies)
  function getPuppies (err, data) {
    if (err) {
      res.send('unable to read the file').status(500)
    } else {
      const nameData = JSON.parse(data)
      const puppyData = nameData.puppies.find(pup => pup.id === id)
      puppyData.name = name
      puppyData.breed = breed
      puppyData.owner = owner
      const newObject = JSON.stringify(nameData, null, 2)
      
      names.writeNames(newObject, (err) => {
        if (err) {
          res.send('unable to save the file').status(500)
        } else {
          res.redirect('/puppies')
        }
      })
    }
  }
})

module.exports = router
