'use strict'

const { promisify } = require('util')
const { bicycle } = require('../../model')
const { uid } = bicycle
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const update = promisify(bicycle.update)
const del = promisify(bicycle.del)

module.exports = async (fastify, opts) => {
    const { notFound } = fastify.httpErrors

    fastify.post('/', async (request, reply) => {
        const { data } = request.body
        const id = uid()
        await create(id, data)
        reply.code(201)
        return { id }
    })

    fastify.post('/:id/update', async (request, reply) => {
        const { id } = request.params
        const { data } = request.body
        try {
            await update(id, data)
            reply.code(204)
        } catch (e) {
            if (e.message === 'not found') throw notFound()
            throw e
        }
    })

    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params
        try {
            return await read(id)
        } catch(e) {
            if (e.message === 'not found') throw notFound()
            throw e
        }
    })

    fastify.put('/:id', async (request, reply) => {
        const { id } = request.params
        const { data } = request.body
        try {
            await create(id, data)
            reply.code(201)
            return {}
        } catch (e) {
            if (e.message === 'resource exists') {
                await update(id, data)
                reply.code(204)
            } else {
                throw e
            }
        }
    })

    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params
        try {
            await del(id)
            reply.code(204)
        } catch (err) {
            if (err.message === 'not found') throw notFound()
            throw err
        }
    })
}
