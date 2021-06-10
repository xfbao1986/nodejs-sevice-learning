'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res, next) => {
    setTimeout(() => {
        var un = req.query.un
        if (typeof(un) === 'string') {
            res.send((un).toUpperCase())
        } else if (Array.isArray(un)) {
            res.send(un.map(e => e.toUpperCase()))
        } else {
            next(new Error('Bad Request'))
        }
    }, 1000)
})

app.use(router)

app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}`)
})
