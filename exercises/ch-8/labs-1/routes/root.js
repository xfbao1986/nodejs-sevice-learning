'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        const { url } = request.query
        try {
            new URL(url)
        } catch(e) {
            console.log('----')
            console.log(url)
            console.log(e)
            throw fastify.httpErrors.badRequest()
        }
        return reply.from(url)
    })
}
