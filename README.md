# Robot Royale

Multiplayer game for programming awkward robots. The game is projected on a large floor space. Visitors can open a url on their phone to participate in the game. In the game, users program a robot. The robot battles the other robots according to its program.

### Server

Node app uses socket.io to notify the game when a new robot is created. The server only passes events between creator windows and viewer windows. The server does not keep track of any data.

https://socket.io/docs/emit-cheatsheet/

### Creator

Page where users create a robot. Press send button to emit the form details. Any viewer page will listen to this event and create the robot according to how the form was filled in.

Robots have an ID so new events from the Creator window can be linked to Robots currently moving in the viewer window.

### Viewer

Page where all created robots battle according to their settings. The robots move autonomously. The page starts empty. When a creator page emits a "create" event, a new robot is added. When a creator page emits a "power" event, the viewer finds the robot by its id and lets it use its power.

### Robots

Robots have these settings:

- Armor : heavy, medium, slow. This affects bullet damage and speed. Each armor has its own PNG image.
- Color : Use a CSS filter on the PNG image to colorize it.
- ID : Unique ID to identify this tank on the server and client. Generated once when creator page is opened.
- Name : Display name
- Socket ID : The connection id of the websocket. This may change when a creator window is closed or has been inactive. Socket ID is used to send messages from the viewer to the creator.
- Program : An array of numbers indicating the behaviours that this tank executes. The program can be updated while the game is running.

### Node messages

To send a message from the server back to a specific tank, find the connection socket id first, by using the tank id. When you have the socket id you can send.
The socket id may change while the game is running due to browser windows becoming inactive. `io.sockets.connected

## Start the server

```
npm install
node server.js
```
## Creator and Viewer Code

Typescript code for the creator and viewer pages is in `creator` and `viewer` folders. *Open these folders in a separate VS Code window*. Press CMD+SHIFT+B to compile to the `dist/creator` and `dist/viewer` folders. Code is loaded as native modules, so you can use `import` and `export` without a module bundler. `import` statements need the `.js` extension for this to work.

Edit HTML and CSS directly in the DIST folders.

# Play

- http://localhost:3000/creator to build a new robot
- http://localhost:3000/viewer to view the battlefield

# Links

- https://socket.io