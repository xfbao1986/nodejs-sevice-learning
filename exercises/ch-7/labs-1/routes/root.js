'use strict'
const got = require('got')
const { promisify } = require('util')
const timeout = promisify(setTimeout)
const {
    BOAT_SERVICE_PORT,
    BRAND_SERVICE_PORT,
} = process.env

module.exports = async function (fastify, opts) {
    const { httpErrors } = fastify
    fastify.get('/:id', async function (request, reply) {
        const { id } = request.params
        try {
            const boat = await got(`http://localhost:${BOAT_SERVICE_PORT}/${id}`).json()
            const brand = await got(`http://localhost:${BRAND_SERVICE_PORT}/${boat.brand}`).json()
            return {
                id: boat.id,
                color: boat.color,
                brand: brand.name,
            }
        } catch (e) {
            if (!e.response) throw e
            if (e.response.statusCode === 404) throw httpErrors.notFound()
            if (e.response.statusCode === 400) throw httpErrors.badRequest()
            throw e
        }
    })
}
