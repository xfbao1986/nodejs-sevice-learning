'use strict'

const { promisify } = require('util')
const {  bicycle } = require('../../model')
const { uid } = bicycle
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const update = promisify(bicycle.update)
const del = promisify(bicycle.del)

module.exports = async (fastify, opts) => {
    const { notFound } = fastify.httpErrors

    fastify.post('/', async (req, reply) => {
        const {data} = req.body
        const id = uid()
        await create(id, data)
        reply.code(201)
        return { id }
    })

    fastify.post('/:id/update', async (req, reply) => {
      try {
        const { id } = req.params
        const { data } = req.body
        await update(id, data)
        reply.code(204)
      } catch (e) {
        if (e.message === 'not found') throw notFound()
        throw e
      }
    })

    fastify.put('/:id', async (req, reply) => {
      const { id } = req.params
      const { data } = req.body
      try {
        await create(id, data)
        reply.code(201)
        return { id }
      } catch (e) {
        if (e.message === 'resource exists') {
          await update(id, data)
          reply.code(204)
        } else throw e
      }
    })

    fastify.get('/:id', async (req, reply) => {
      try {
        const { id } = req.params
        return await read(id)
      } catch (e) {
        if (e.message === 'not found') throw notFound()
        throw e
      }
    })

    fastify.delete('/:id', async (req, reply) => {
      try {
        const { id } = req.params
        await del(id)
        reply.code(204)
      } catch (e) {
        if (e.message === 'not found') throw notFound()
        throw e
      }

    })
}
