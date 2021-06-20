'use strict'

const data = require('../../stream_data')

module.exports = async (fastify, opts) => {
    fastify.get('/', (req, reply) => {
        reply.type('text/html')
        reply.send(data())
    })
}
