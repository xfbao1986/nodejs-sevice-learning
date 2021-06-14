'use strict'

module.exports = async (fastify, opts) => {
    fastify.get('/', async (req, reply) => {
        return reply.view('index.hbs')
    })
}
