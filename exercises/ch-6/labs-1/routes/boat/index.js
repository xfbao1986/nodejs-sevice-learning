'use strict'

const { promisify } = require('util')
const { boat } = require('../../model')
const { uid } = boat
const read = promisify(boat.read)
const create = promisify(boat.create)
const update = promisify(boat.update)
const del = promisify(boat.del)

module.exports = async function (fastify, opts) {
    var { notFound } = fastify.httpErrors

    fastify.get('/:id', async function (request, reply) {
        try {
            return await read(request.params.id)
        } catch(e) {
            if (e.message === 'not found') throw notFound()
            else throw e
        }
    })

    fastify.post('/', async function (request, reply) {
        var id = uid()
        await create(id, request.body.data)
        reply.code(201)
        return { id }
    })
}
