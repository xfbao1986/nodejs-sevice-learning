'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('example is loaded', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/stream_data'
  })
  t.match(res.payload, /this<br>is<br>a<br>stream<br>of<br>data/)
})
