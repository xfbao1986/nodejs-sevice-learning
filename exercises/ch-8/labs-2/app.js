'use strict'

const proxy = require('fastify-http-proxy')
const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    // fastify.register(AutoLoad, {
    //     dir: path.join(__dirname, 'routes'),
    //     options: Object.assign({}, opts)
    // })

    fastify.register(proxy, {
        upstream: 'https://jsonplaceholder.typicode.com/'
    })
}
