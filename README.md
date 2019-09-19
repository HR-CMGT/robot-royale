# Robot Royale

Multiplayer game for programming awkward robots. The game is projected on a large floor space. Visitors can open a url on their phone to participate in the game. In the game, users program a robot. The robot battles the other robots according to its program.

[youtube demo](https://youtu.be/K67KcHwLSt0)

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
- ID
- Name

Robots have program blocks that can be rearranged while the game is running:

- Turn towards nearest enemy
- Drive forward and shoot
- Turn towards nearest ammo box
- Turn towards nearest health kit

## Start the server

```
npm install
node server.js
```
## Creator and Viewer Code

Typescript code for the creator and viewer pages is in `creator` and `viewer` folders. *Open these folders in a separate VS Code window or in a VS Code workspace*. Press CMD+SHIFT+B to compile to the `dist/creator` and `dist/viewer` folders. Code is loaded as native modules, so you can use `import` and `export` without a module bundler. `import` statements need the `.js` extension for this to work.

Edit HTML and CSS directly in the DIST folders.

# Play

- http://localhost:3000/creator to build a new robot
- http://localhost:3000/viewer to view the battlefield

# Links

- https://socket.io
- [typescript in node](https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d)

# TODO 

### CREATOR

- scan QR code to open url
- graphic design, responsive view

### GAME

- robots moving around according to their settings
- display the three longest lasting robots
- save hiscores (longest lasting robots) in a cookie

### SERVER

- send "robot died" message directly back to the robot creator view using socket id.
- Put `server.js` and `node_modules` for server in own subfolder 
- Install on cmgt.hr.nl server
- Add `node forever` https://github.com/foreversd/forever to automatically restart after crashes
- Keep hiscore list on server? save in .json file?


