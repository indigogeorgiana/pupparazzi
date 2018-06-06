const request = require('supertest')
const cheerio = require('cheerio')
const server = require('../server')

test('GET puppies page', done => {
  request(server)
    .get('/puppies/1')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const h1 = $('div').text()
      expect(h1).toMatch('Breed')
      done(err)
    })
})

test('GET puppies edit page form', done => {
  request(server)
    .get('/puppies/edit/1')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const h1 = $('label').attr('for')
      console.log(h1)
      expect(h1).toMatch('name')
      done(err)
    })
})

test('POST to data json and redirect', done => {
  request(server)
    .post('/puppies/edit/7')
    .send('owner=bron')
    .end((err, res) => {
      expect(res.statusCode).toBe(302)
      expect(res.text).toBe('Found. Redirecting to /')
      done(err)
    })
})