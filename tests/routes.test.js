const cheerio = require('cheerio')
const request = require('supertest')
const routes = require('../routes')
const server = require('../server')

test('all systems go', (done) => {
  expect(true).toBeTruthy()
  done()
})

test('/ leads to /puppies', (done) => {
  request(server)
    .get('/')
    .expect(302)
    .end((err, res) => {
      expect(res.text).toMatch('Found. Redirecting to /puppies')

      done(err)
    })
})

test("testing if /puppies has the title 'Pupparazzi'", (done) => {
  request(server)
    .get('/puppies')
    .expect(200)
    .end((err, res) => {
      console.log(res)
      expect(res.text).toMatch('Pupparazzi')
      done(err)
    })
})
