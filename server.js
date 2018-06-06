const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes/routes.js')
const puppiesroutes = require('./routes/puppiesroutes.js')

const server = express()

// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))

server.use('/', routes)
server.use('/puppies', puppiesroutes)

module.exports = server
