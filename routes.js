const express = require('express')
const getData = require('./getData.js')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('show me something')
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

router.get('/', (req, res) => {
  const id = Number(req.params.id)
  getData((err, data) => {
    if (err) {
      res.send('unable to this file').status(500)
    } else {
      const puppiesData = JSON.parse(data)
      const puppyData = puppiesData.puppies.find(pup => pup.id === id)
      res.render('.view/puppies', puppyData)
    }
  })
})

// router.get('/:id', (req, res) => {
//   const id = Number(req.params.id)
//   getData((err, data) => {
//     if (err) {
//       res.send('unable to read id file').status(500)
//     } else {
//       const puppiesData = JSON.parse(data)
//       const puppyData = puppiesData.puppies.find(pup => pup.id === id)
//       res.render('view', puppyData)
//     }
//   })
// })

module.exports = router
