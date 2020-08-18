const http = require('http')
const fs = require('fs')
const archiver = require('archiver')

let package = 'package'
const archive = archiver('zip', {
    zlib: { level: 9 },
})
archive.directory(package, false)

const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=' + package + '.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
}

const req = http.request(options)
archive.pipe(req)
archive.on('end', () => {
    req.end()
})
archive.finalize()
