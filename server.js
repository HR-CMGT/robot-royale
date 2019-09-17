const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('dist'))


// the robot creator view
app.get('/creator', function (req, res) {
    res.sendFile(__dirname + '/creator/')
})

// the game view
app.get('/viewer', function (req, res) {
    res.sendFile(__dirname + '/viewer/')
})

io.on('connection', (socket) => {
    console.log('new connection')
    // can we get the ip address here? use as id
    // let id = socket.getUniqueID()
    //console.log(id)

    socket.on('robot created', (json) => {
        let data = JSON.parse(json)
        
        console.log('robot created ' + data.id)

        // tell the game that there is a new robot - todo FOR VIEWER
        io.emit('new robot', json, { for: 'everyone' });
    });

    
    socket.on('robot destroyed', (id) => {
        // TODO let only the viewer know that his robot has died
        // https://socket.io/docs/emit-cheatsheet/
        // sending to individual socketid (private message)
        // io.to(`${socketId}`).emit('hey', 'I just met you');
    });
    

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });

    // todo dit is dubbel? moet dit via server.js?
    socket.on('robot power', (id) => {
        console.log("user special power " + id)
        io.emit('robot power', id, { for: 'everyone' });
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000')
})