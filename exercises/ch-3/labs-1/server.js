const http = require('http')
const url = require('url')
const PORT = 3000

var data = require('./data')

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    const { pathname } = url.parse(req.url)
    try {
        if (pathname === '/') {
            res.end(await data())
        } else {
            res.statusCode = 404
            res.end('not found')
        }
    } catch(e) {
        console.error(e)
        res.statusCode = 503
        res.end(e.message)
    }
})

server.listen(PORT)
