'use strict'

const { promisify } = require('util')
const got = require('got')
const {
    BICYCLE_SERVICE_PORT = 4000,
    BRAND_SERVICE_PORT = 5000
} = process.env
const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async (fastify, opts) => {
    const { notFound, badRequest } = fastify.httpErrors

    fastify.get('/:id', async (req, reply) => {
        try {
            const { id } = req.params
            const bicycle = await got(`${bicycleSrv}/${id}`).json()
            const brand = await got(`${brandSrv}/${id}`).json()
            return {
                id: id,
                color: bicycle.color,
                brand: brand.name
            }
        } catch(e) {
            if(!e.response) throw e
            if(e.response.statusCode === 404) throw notFound()
            if(e.response.statusCode === 400) throw badRequest()
            throw e
        }
    })
}
