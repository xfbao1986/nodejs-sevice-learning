'use strict'

module.exports = async (fastify, opts) => {
    fastify.get('/', async (req, reply) => {
        const { greeting = 'bao'} = req.query
        return reply.view('hello.hbs', { greeting })
    })
}
