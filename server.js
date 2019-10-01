const express       = require('express')
const app           = express()
const http          = require('http').createServer(app)
const https         = require('https')
const fs            = require('fs')
const io            = require('socket.io')(http)
const debug         = true

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
        let debug = JSON.parse(json)
        console.log('robot created ' + debug.nickname)

        // tell the game that there is a new robot - todo FOR VIEWER
        io.emit('robot created', json, { for: 'everyone' });
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
    socket.on('robot updated', (json) => {
        let debug = JSON.parse(json)
        console.log('new program for ' + debug.nickname)
        io.emit('robot updated', json, { for: 'everyone' })
    });
});

if(debug) {
    http.listen(3000, () => {
        console.log('listening on *:3000')
    })
} else {
    var key     = fs.readFileSync('/encryption/cmgt.hr.nl.key');    // private key
    var cert    = fs.readFileSync('/encryption/bundle.crt' );      // primary
    //var ca      = fs.readFileSync('/encryption/DigiCertCA.crt' ); // intermediate

    var options = {
        key: key,
        cert: cert
    //    ca: ca
    };

    https.createServer(options, app).listen(8080, () => {
        console.log('listening on *:8080')
    });
}