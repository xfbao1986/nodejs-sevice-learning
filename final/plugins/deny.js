'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest', async (req) => {
    if (req.routerPath.match(/\/deny/)) {
      throw fastify.httpErrors.forbidden()
    }
  })
})
