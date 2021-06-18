'use strict'

const proxy = require('fastify-http-proxy')
const { Readable } = require('stream')

async function* upper(res) {
  for await (const chunk of res) {
    yield chunk.toString().toUpperCase()
  }
}

module.exports = async (fastify, opts) => {
  fastify.register(proxy, {
    upstream: 'https://news.ycombinator.com/',
    async preHandler(request, reply) {
      if (request.query.token !== 'abc') {
        throw fastify.httpErrors.unauthorized()
      }
    }
  })
}
