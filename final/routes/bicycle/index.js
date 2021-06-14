'use strict'

const {  bicycle } = require('../../model')

module.exports = async (fastify, opts) => {
    fastify.get('/:id', (req, reply) => {
        const id = req.params.id
        bicycle.read(id, (e, result) => {
            if(e) {
                if (e.message == 'not found') reply.notFound()
                else reply.send(e)
            } else reply.send(result)
        })

    })
}
