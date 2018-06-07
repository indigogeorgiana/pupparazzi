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
function puppyDataWrite (puppies, callback) {
  const puppyPath = path.join(__dirname, 'data.json')
  fs.writeFile(puppyPath, puppies, 'utf8', callback)
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
// router.post('/puppies/edit/:id', (req, res) => {
// const id = Number(req.params.id)
// const puppyInfo = {
//   id: id,
//   name: req.body.name,
//   owner: req.body.owner,
//   breed: req.body.breed
// }
router.post('/puppies/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  const name = req.body.name
  const breed = req.body.breed
  const owner = req.body.owner
  getData(pupFileData)
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

  // getData((err, data) => {
  //   if (err) {
  //     res.status(500).send('error')
  //   } else {
  //     const pupData = JSON.parse(data)
  //     pupData.puppies[id - 1] = puppyInfo

  //     fs.writeFile('./data.json', JSON.stringify(pupData), (err) => {
  //       if (err) {
  //         res.status(500).send('error')
  //       } else {
  //         res.redirect('/puppies/' + id)
  //       }
  //     })
  //   }
  // })
})

module.exports = router
