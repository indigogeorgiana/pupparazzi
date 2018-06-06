const express = require('express')
const getData = require('./getData.js')
const writeNames = require('./names.js')

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
  // read names.json into a js object
  // Create an object that represents all the data of the puppy we are going to update
    if (err) {
      res.send('unable to read the file').status(500)
    } else {
      const nameData = JSON.parse(data)
      // push the new name onto the names array
      // Update the puppy in the array
      // Read in the JSON file and locate the puppy we are going to update
      const puppyData = nameData.puppies.find(pup => pup.id === id)
      puppyData.name = name
      puppyData.breed = breed
      puppyData.owner = owner
      const newObject = JSON.stringify(nameData, null, 2)
      // turn the js object into a string
      // save the string back to names.json
      writeNames.writeNames(newObject, (err) => {
        if (err) {
          res.send('unable to save the file').status(500)
        } else {
          // Redirect to the get /puppies/edit/:id route
          res.redirect('/puppies/edit/')
        }
      })
    }
  }
})

module.exports = router
