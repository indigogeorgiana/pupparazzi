const express = require('express')
const fs = require('fs')
const functions = require('./functions')

const router = express.Router()

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

router.get('/edit/:id', (req, res) => {
  functions.getData((err, data) => {
    if (err) {
      res.status(500)
    } else {
      const puppyId = Number(req.params.id)
      const puppyStuff = JSON.parse(data)
      const dogId = puppyStuff.puppies.find(obj => obj.id === puppyId)
      res.render('./puppies/edit', dogId)
    }
  })
})

router.post('/edit/:id', (req, res) => {
  const pupName = req.body.name
  const pupBreed = req.body.breed
  const pupOwner = req.body.owner
  res.render('')
})

module.exports = router