'use strict'

const { Readable } = require('stream')

async function* upper(res) {
  for await (const chunk of res) {
    yield chunk.toString().toUpperCase()
  }
}

module.exports = async (fastify, opts) => {
  fastify.get('/', async (req, reply) => {
    const { url } = req.query
    try {
      new URL(url)
    } catch (e) {
      throw fastify.httpErrors.badRequest()
    }
    return reply.from(url, {
      onResponse (req, reply, res) {
        reply.send(Readable.from(upper(res)))
      }
    })
  })
}
