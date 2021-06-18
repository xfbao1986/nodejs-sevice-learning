'use strict'

const data = require('../../streamData')

module.exports = async (fastify, opts) => {
    fastify.get('/', (req, reply) => {
        reply.type('text/html')
        reply.send(data())
    })
}
