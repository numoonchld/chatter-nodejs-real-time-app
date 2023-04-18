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
app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html')
})
app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html')
})
app.get('/html-css', (req, res) => {
    res.sendFile(__dirname + '/public/html-css.html')
})

// tech namespace 
const tech = io.of('/tech')

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        console.log({ data })
        socket.join(data.room)
        tech.in(data.room).emit('message', `new user joined ${data.room} room`)
    })

    socket.on('messages', (data) => {
        console.log(`message: ${data.message}`)

        // only in room
        tech.in(data.room).emit('message', data.message)

        // all rooms
        // tech.emit('message', data.message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')

        tech.emit('message', 'user disconnected')
    })
})

