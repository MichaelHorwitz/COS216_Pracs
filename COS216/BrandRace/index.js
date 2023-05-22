const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const readline = require('readline');
const { start } = require('repl');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

var usernamesInUse = [];
var rooms = {};
var numRooms = 0;
async function startGame(gameID) {
  console.log("Game started");
  console.log(gameID);
  io.to(gameID).emit("countdownStart");
  var rounds = [];
  try {
    for (let i = 0; i < 5; i++) {
      //var response = axios.get('http://localhost:3000/api.php/GetRandomCars');
      var response = await axios.get('https://u22512323:Pf9xghu4YSFyHw@wheatley.cs.up.ac.za/u22512323/api.php');
      rounds[i] = response.data;
      //console.log(response.data);
    }
    var sendObj = { rounds: rounds };
    //console.log("SendObj: " + sendObj.rounds[0].data);
    io.to(gameID).emit('gameStart', sendObj);
  } catch (error) {
    console.error(error);
  }
}
function generateGameID() {
  var gameID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    gameID += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return gameID;
}
function checkUsername(username, socketID) {
  var inUse = false;
  //console.log("InputUsername: " + username);
  usernamesInUse.forEach(element => {
    //console.log("currUsername: " + element.username);
    if (element.username == username) {
      inUse = true;
    }
  });
  if (inUse) {
    return false;
  }
  usernamesInUse.push({ username: username, socketID: socketID });

  return true;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('checkUsername', (username) => {
    if (checkUsername(username, socket.id)) {
      socket.emit('usernameResult', { socketID: socket.id, username: username, result: true });
    } else {
      socket.emit('usernameResult', { socketID: socket.id, username: username, result: false });
    }
  });
  socket.on('createNewGame', () => {
    //console.log("Server create new game");
    var gameID = generateGameID();
    socket.join(gameID);
    rooms[gameID] = {};
    rooms[gameID].socket1 = socket.id;
    rooms[gameID].score1 = 0;
    rooms[gameID].score2 = 0;
    var sendObj = { gameID: gameID }
    socket.emit('gameID', sendObj);
  });
  socket.on('joinGame', (gameID) => {
    //socket.join(gameID)
    //console.log("server join:" + gameID);
    //console.log(io.sockets.adapter.rooms);
    if (io.sockets.adapter.rooms.has(gameID)) {
      rooms[gameID].socket2 = socket.id;
      socket.join(gameID);
      startGame(gameID);
    } else {
      socket.emit('joinError');
    }
  });
  socket.on('guess', (gameID) => {
    socket.emit('roundWin');
    var room = rooms[gameID];
    if (room.socket1 === socket.id) {
      room.score1 = room.score1 + 1;
      console.log(room.score1);
    } else if (room.socket2 === socket.id) {
      room.score2 = room.score2 + 1;
      console.log(room.score2);
    }
    socketID = socket.id;
    var room = io.sockets.adapter.rooms.get(gameID);
    for (const clientID of room) {
      if (socketID !== clientID) {
        var loserSocket = io.sockets.sockets.get(clientID);
        loserSocket.emit('roundLose');
      }
    }
    var room = rooms[gameID];
    //console.log('room scores');
    //console.log(room.score1);
    //console.log(room.score2);
    //console.log(room.score2 + room.score1);
    if (room.score1 + room.score2 !== 5) {
      setTimeout(() => { io.to(gameID).emit('roundBegin') }, 3000);
    } else {
      console.log("GAME OVER");
      if (room.score1 > room.score2) {
        io.sockets.sockets.get(room.socket1).emit('gameWin');
        io.sockets.sockets.get(room.socket2).emit('gameLose');
      } else {
        io.sockets.sockets.get(room.socket2).emit('gameWin');
        io.sockets.sockets.get(room.socket1).emit('gameLose');

      }
    }
  });
});

var portNum;
var outputted = false;
function getPort(){
  rl.question('Enter your input: ', (input) => {
    console.log('User input:', input);
    portNum = input;
    server.listen(portNum, () => {
      if (!outputted) {
        console.log('listening on *' + portNum);
        outputted = true;
      }
    });
    server.on('error', () => {
      console.log('Port in use');
      getPort();
    });
    
    
  });
}
getPort();
rl.on("line", (line) => {
  if (line === 'LIST') {
    usernamesInUse.forEach(element => {
      console.log("Username: " + element.username + " SocketID: " + element.socketID);
    });
  }
  if (line === 'QUIT') {
    io.emit('endServer');
    io.server.close();
  }
  if (line === 'GAMES') {
    var keys = Object.keys(rooms);
    keys.forEach(element => {
      console.log(element);
    });
  }
  //console.log(line.split()[0]);
  if (line.split(" ")[0] === 'KILL') {
    var username = line.split(" ")[1];
    //console.log(username);
    var socketID;
    for (let index = 0; index < usernamesInUse.length; index++) {
      console.log(usernamesInUse[index]);
      if (usernamesInUse[index].username === username) {
        socketID = usernamesInUse[index].socketID;
        usernamesInUse[index] = null;
        //console.log(socketID);
      }
    }
    console.log(socketID);
    try {
      io.sockets.sockets.get(socketID).close();
    } catch (error) {
      console.log("Unable to kill user");
    }

  }
});


