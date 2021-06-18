'use strict'

module.exports = async (fastify, opts) => {
    fastify.get('/', async (req, reply) => {
        return reply.send('this message should not be seen')
    })
    fastify.get('/:foo', async (req, reply) => {
        return reply.send('this message should not be seen')
    })
}
