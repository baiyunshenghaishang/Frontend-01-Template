const http = require('http')
const fs = require('fs')
const unzipper = require('unzipper')
// Create an HTTP server
const srv = http.createServer((req, res) => {
    let writeStream = unzipper.Extract({ path: '../toy-server/public/' })
    req.pipe(writeStream)
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('okay')
    })
})

// now that server is running
srv.listen(8081)
