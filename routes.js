const express = require('express')
const router = express.Router()

const puppyData = require('./getData.js')
router.get('/', (req, res) => {
  res.redirect('/puppies')
})

router.get('/puppies', (req, res) => {
  puppyData(pupFileData)
  function pupFileData (err, data) {
    if (err) {
      res.send('error recieved')
    }

    else {
      const puppies = JSON.parse(data)
      res.render('puppies/index', puppies)
    }
  }
})

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  puppyData(pupFileData)
  function pupFileData (err, data) {
    if (err) {
      res.send('error recieved')
    }

    else {
      const puppies = JSON.parse(data)
      const puppy = puppies.puppies.find(pup => pup.id === id)
      res.render('puppies/view', puppy)
    }
  }

})

module.exports = router
