'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('test deny', async (t) => {
  const app = build(t)

  var res = await app.inject({
    url: '/deny',
  })
  t.equal(res.statusCode, 403)
  t.equal(res.body, JSON.stringify({"statusCode":403,"error":"Forbidden","message":"Forbidden"}))

  res = await app.inject({
    url: '/deny/XXXX',
  })
  t.equal(res.statusCode, 403)
  t.equal(res.body, JSON.stringify({"statusCode":403,"error":"Forbidden","message":"Forbidden"}))
})
