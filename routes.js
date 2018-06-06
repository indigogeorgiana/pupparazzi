const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/puppies')
})

// get puppies
router.get('/puppies', (req, res) => {
  getData((err, data) => {
    if (err) {
      return res.status(500).send('error')
    } else {
      const pupData = JSON.parse(data)

      res.render('./puppies/index', pupData)
    }
  })
})

router.get('/puppies/:id', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      return res.status(500).send('error')
    } else {
      const pupData = JSON.parse(data)
      const puppy = pupData.puppies.find(pup => pup.id === id)
      res.render('./puppies/view', puppy)
    }
  })
})

function getData (callback) {
  const filePath = path.join(__dirname, 'data.json')
  fs.readFile(filePath, 'utf8', callback)
}

router.get('/puppies/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      return res.status(500).send('error')
    } else {
      const pupData = JSON.parse(data)
      const puppy = pupData.puppies.find(pup => pup.id === id)
      res.render('./puppies/edit', puppy)
    }
  })
})
router.post('/puppies/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  const puppyInfo = {
    id: id,
    name: req.body.name,
    owner: req.body.owner,
    breed: req.body.breed
  }

  getData((err, data) => {
    if (err) {
      res.status(500).send('error')
    } else {
      const pupData = JSON.parse(data)
      pupData.puppies[id - 1].name = puppyInfo.name
      pupData.puppies[id - 1].owner = puppyInfo.owner
      pupData.puppies[id - 1].breed = puppyInfo.breed

      fs.writeFile('./data.json', JSON.stringify(pupData), (err) => {
        if (err) {
          res.status(500).send('error')
        } else {
          res.redirect('/puppies/:id')
        }
      })
    }
  })
})

module.exports = router
