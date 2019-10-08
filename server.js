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
    // NEW CONNECTION MAY BE FOR A ROBOT THAT ALREADY EXISTS
    console.log('new connection')


    // when the client tank gets a new socket id, we need to update it in the game too
    socket.on('robot reconnected', (json) => {
        let debug = JSON.parse(json)
        console.log('robot socket updated ' + debug.socketid)

        // tell the game that there is a new robot - todo FOR VIEWER
        io.emit('robot reconnected', json, { for: 'everyone' });
    });



    // todo game moet ook de socketid updaten, want die kan veranderd zijn
    socket.on('robot created', (json) => {
        let debug = JSON.parse(json)
        console.log('robot created ' + debug.nickname)

        // tell the game that there is a new robot - todo FOR VIEWER
        io.emit('robot created', json, { for: 'everyone' });
    });

    
    socket.on('robot destroyed', (socketid) => {
        // send message to this specific tank
        io.to(socketid).emit("tank destroyed")
        // io.sockets.socket(socketid).emit("tank destroyed")
        // https://socket.io/docs/emit-cheatsheet/
    });
    
    // todo hier ook de socketid updaten, want die kan veranderd zijn
    socket.on('robot updated', (json) => {
        let debug = JSON.parse(json)
        console.log('new program for ' + debug.nickname)
        io.emit('robot updated', json, { for: 'everyone' })
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
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