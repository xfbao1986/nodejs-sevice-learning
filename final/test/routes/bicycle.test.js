'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('bicycle is loaded', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/bicycle/1',
    method: 'GET'
  })
  console.log('status code: ', res.statusCode)
  console.log('body: ', res.body)
  t.equal(res.statusCode, 200)
  t.equal(res.body, JSON.stringify({"brand":"v","color":"green"}))
})

// inject callback style:
//
// test('example is loaded', (t) => {
//   t.plan(2)
//   const app = build(t)
//
//   app.inject({
//     url: '/example'
//   }, (err, res) => {
//     t.error(err)
//     t.equal(res.payload, 'this is an example')
//   })
// })
