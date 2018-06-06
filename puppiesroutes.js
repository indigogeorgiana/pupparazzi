const express = require('express')
const fs = require('fs')
const functions = require('./functions')

const router = express.Router()

router.use(express.urlencoded({extended: false}))

// User story 1

router.get('/', (req, res) => {
  functions.getData((err, data) => {
    if (err) {
      res.status(500)
    } else {
      const puppyStuff = JSON.parse(data)
      res.render('./puppies/index', puppyStuff)
    }
  })
})

// User story 2

router.get('/:id', (req, res) => {
  functions.getData((err, data) => {
    if (err) {
      res.status(500)
    } else {
      const puppyId = Number(req.params.id)
      const puppyStuff = JSON.parse(data)
      const dogId = puppyStuff.puppies.find(obj => obj.id === puppyId)
      res.render('./puppies/view', dogId)
    }
  })
})

// User story 3a

router.get('/edit/:id', (req, res) => {
  functions.getData((err, data) => {
    if (err) {
      res.status(500)
    } else {
      const puppyId = Number(req.params.id)
      const puppyStuff = JSON.parse(data)
      const dogId = puppyStuff.puppies.find(obj => obj.id === puppyId)
      // console.log(dogId.name = 'test')
      res.render('./puppies/edit', dogId)
    }
  })
})

// User story 3b

router.post('/edit/:id', (req, res) => {
  functions.getData((err, data) => {
    const newName = req.body.name
    const newBreed = req.body.breed
    const newOwner = req.body.owner
    if (err) {
      res.status(500)
    } else {
      const puppyStuff = JSON.parse(data)
      const puppyId = Number(req.params.id)
      const dog = puppyStuff.puppies.find(obj => obj.id === puppyId)
      dog.name = newName
      dog.breed = newBreed
      dog.owner = newOwner
      const puppyString = JSON.stringify(puppyStuff, null, 2)
      functions.writeData(puppyString, (err) => {
        if (err) {
          res.send('chocolate').status(500)
        } else {
          res.redirect('/')
        }
      })
      console.log(puppyString)
    }
  })
})

module.exports = router
