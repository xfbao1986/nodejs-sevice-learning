'use strict'

const data1 = require('../../data1')

module.exports = async (fastify, opts) => {
    fastify.get('/', (req, reply) => {
        reply.type('text/html')
        reply.send(data1())
    })
}
