'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

const pointOfView = require('point-of-view')
const handlebars = require('handlebars')

// const dev = process.env.NODE_ENV !== 'production'
// const fastifyStatic = dev && require('fastify-static')

module.exports = async function (fastify, opts) {
    fastify.register(pointOfView, {
        engine: { handlebars },
        root: path.join(__dirname, 'views'),
        layout: 'layout.hbs'
    })

    // if(dev) {
    //     fastify.register(fastifyStatic, {
    //         root: path.join(__dirname, 'public')
    //     })
    // }

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })

    fastify.setNotFoundHandler((request, reply) => {
        if (request.method !== 'GET') {
            reply.status(405)
            return 'Method Not Allowed\n'
        }
        return 'Not Found\n'
    })
}
