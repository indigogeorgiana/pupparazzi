const express = require('express')
const router = express.Router()

const puppyData = require('./getData.js')
router.get('/', (req, res) => {
  res.send('hey guess what im working properly')
})

router.get('/puppies', (req, res) => {
  puppyData(pupFileData)
  function pupFileData (err, data) {
    if (err){ 
      res.send('error recieved') 
    } 

    else{
      const puppies = JSON.parse(data)
      res.render('puppies/index', puppies ) 
    }
  }
})

module.exports = router





