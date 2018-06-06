const request = require('supertest')
const cheerio = require('cheerio')
const server = require('../server')

test('GET root route page', done => {
  request(server)
    .get('/puppies')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const h1 = $('h1').text()
      expect(h1).toMatch('Pupparazzi')
      done(err)
    })
})
