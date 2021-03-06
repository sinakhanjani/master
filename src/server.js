const server = require('./io')
const { host, port } = require('./app')

// Listening server
server.listen(port, () => {  
    if (server.address().host) {
        process.env.HOST = server.address().host
    }

    const $host = server.address().host || host
    const message = `Socket: ${$host} is opening on port: ${port}`
    console.log(message);
})
