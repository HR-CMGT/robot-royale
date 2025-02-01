require('dotenv/config');
const express = require('express');
const app = express();
const fs = require('fs');
const { Server } = require('socket.io');
const debug = process.env.DEBUG === 'true';

app.use(express.static('dist'));
const port = process.env.PORT || 8080;

let webServer;
if (debug) {
    const { createServer } = require('http');
    webServer = createServer(app);
} else {
    // SECURE SERVER
    const key = fs.readFileSync(process.env.KEY);    // private key
    const cert = fs.readFileSync(process.env.CERT);      // primary
    //const ca      = fs.readFileSync('/encryption/DigiCertCA.crt' ); // intermediate

    const options = {
        key: key,
        cert: cert,
        //    ca: ca
    };
    const { createServer } = require('https');
    webServer = createServer(options, app);
}
const io = new Server(webServer,  {});
// the robot creator view
app.get('/creator', function (req, res) {
    res.sendFile(__dirname + '/creator/');
});

// the game view
app.get('/viewer', function (req, res) {
    res.sendFile(__dirname + '/viewer/');
});

io.on('connection', (socket) => {
    // NEW CONNECTION MAY BE FOR A ROBOT THAT ALREADY EXISTS
    console.log('new connection');


    // when the client tank gets a new socket id, we need to update it in the game too
    socket.on('robot reconnected', (json) => {
        let debug = JSON.parse(json);
        console.log('robot socket updated ' + debug.socketid);

        // tell the game that there is a new robot - todo FOR VIEWER
        io.emit('robot reconnected', json, {for: 'everyone'});
    });

    // viewer window was refreshed - destroy all the old robots that were already running
    socket.on('viewer refreshed', () => {
        io.emit('viewer refreshed');
    });

    // todo game moet ook de socketid updaten, want die kan veranderd zijn
    socket.on('robot created', (json) => {
        let debug = JSON.parse(json);
        console.log('robot created ' + debug.nickname);

        // tell the game that there is a new robot - todo FOR VIEWER
        io.emit('robot created', json, {for: 'everyone'});
    });


    socket.on('robot destroyed', (socketid) => {
        // send message to this specific tank
        io.to(socketid).emit("tank destroyed");
        // io.sockets.socket(socketid).emit("tank destroyed")
        // https://socket.io/docs/emit-cheatsheet/
    });

    // todo hier ook de socketid updaten, want die kan veranderd zijn
    socket.on('robot updated', (json) => {
        let debug = JSON.parse(json);
        console.log('new program for ' + debug.nickname);
        io.emit('robot updated', json, {for: 'everyone'});
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // TODO if the GAME VIEW has disconnected, send message to all robots
        // 
    });
});

webServer.listen(port, () => {
    console.log('server running at ' + port);
    const protocol = debug ? 'http' : 'https';
    console.log(`viewer  ${protocol}://${process.env.HOST}:${webServer.address().port}/viewer`);
    console.log(`creator  ${protocol}://${process.env.HOST}:${webServer.address().port}/creator`);
});
