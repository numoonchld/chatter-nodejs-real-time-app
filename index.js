const app = require('express')()

const server = require('http').Server(app)

const io = require('socket.io')(server)

const port = 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// tech namespace 
const tech = io.of('/tech')

tech.on('connection', (socket) => {
    console.log('user connected')


    socket.on('messages', (message) => {
        console.log(`message: ${message}`)

        tech.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')

        tech.emit('message', 'user disconnected')
    })
})

