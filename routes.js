const express = require('express')
const router = express.Router()

const puppyDataGet = require('./getData.js').getFile
const puppyDataWrite = require('./getData.js').writeToFile
router.get('/', (req, res) => {
  res.redirect('/puppies')
})

router.get('/puppies', (req, res) => {
  puppyDataGet(pupFileData)
  function pupFileData (err, data) {
    if (err) {
      res.send('error recieved')
    } else {
      const puppies = JSON.parse(data)
      res.render('puppies/index', puppies)
    }
  }
})

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  puppyDataGet(pupFileData)
  function pupFileData (err, data) {
    if (err) {
      res.send('error recieved')
    } else {
      const puppies = JSON.parse(data)
      const puppy = puppies.puppies.find(pup => pup.id === id)
      res.render('puppies/view', puppy)
    }
  }
})

router.get('/puppies/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  puppyDataGet(pupFileData)
  function pupFileData (err, data) {
    if (err) {
      res.send('error recieved')
    } else {
      const puppies = JSON.parse(data)
      const puppy = puppies.puppies.find(pup => pup.id === id)
      res.render('puppies/edit', puppy)
    }
  }
})

router.post('/puppies/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  const name = req.body.name
  const breed = req.body.breed
  const owner = req.body.owner
  puppyDataGet(pupFileData)
  function pupFileData (err, data) {
    if (err) {
      res.send('error recieved')
    } else {
      const id = Number(req.params.id)
      const puppies = JSON.parse(data)
      console.log(puppies.puppies[1].name)
      puppies.puppies[id - 1].name = name
      puppies.puppies[id - 1].breed = breed
      puppies.puppies[id - 1].owner = owner
      const newPuppies = JSON.stringify(puppies, null, 3)
      puppyDataWrite(newPuppies, (err, data) => {
        if (err) { res.send('error sending data').status(500) } else {
          res.redirect('/puppies/' + id)
        }
      })
    }
  }
})

// router.post('/puppies/edit/:id', (req, res) => {
//   res.send(req.body)
// })

module.exports = router
