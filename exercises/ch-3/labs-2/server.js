const http = require('http')
const url = require('url')
const PORT = 3000

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    const { pathname } = url.parse(req.url)
    if (req.method !== 'GET') {
        res.statusCode = 405
        res.end('method not allowed')
    } else {
        res.statusCode = 200
        res.end('ok')
    }
})

server.listen(PORT)
