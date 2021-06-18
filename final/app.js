'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const replyFrom = require('fastify-reply-from')

const dev = process.env.NODE_ENV != 'production'
const fastifyStatic = dev && require('fastify-static')
const pointOfView = require('point-of-view')
const handlebars = require('handlebars')

module.exports = async function (fastify, opts) {
    fastify.register(replyFrom)

    if(dev) {
        fastify.register(fastifyStatic, {
            root: path.join(__dirname, 'public')
        })
    }

    fastify.register(pointOfView, {
        engine: { handlebars },
        root: path.join(__dirname, 'views'),
        layout: 'layout.hbs'
    })

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })

    fastify.setNotFoundHandler((req, reply) => {
        if (req.method != 'GET') {
            reply.status(405)
            return 'method not allowed\n'
        }
        return 'not found\n'
    })
}
