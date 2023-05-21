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
var rooms = [];
var numRooms = 0;
function startGame(gameID){
  console.log("Game started");
  console.log(gameID);
  io.to(gameID).emit("countdownStart");
  var rounds = [];
  try {
    for (let i = 0; i < 5; i++) {
      var responseStr = axios.get('/api.php/GetRandomCars');
      var response = JSON.parse(responseStr);
      rounds[i] = response;
    }
    var sendObj = {rounds: rounds};
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
function checkUsername(username, socketID){
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
  usernamesInUse.push({username: username, socketID: socketID});
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
    if(checkUsername(username, socket.id)){
      socket.emit('usernameResult', {socketID: socket.id, username:username, result:true});
    } else {
      socket.emit('usernameResult', {socketID: socket.id, username:username, result:false});
    }
  });
  socket.on('createNewGame', ()=>{
    //console.log("Server create new game");
    var gameID = generateGameID();
    socket.join(gameID);
    var sendObj = {gameID: gameID}
    socket.emit('gameID', sendObj);
  });
  socket.on('joinGame', (gameID)=>{
    //socket.join(gameID)
    //console.log("server join:" + gameID);
    //console.log(io.sockets.adapter.rooms);
    if(io.sockets.adapter.rooms.has(gameID))
    {
      socket.join(gameID);
      startGame(gameID);
    } else {
      socket.emit('joinError');
    }
  });

});

var portNum;
try {
  rl.question('Enter your input: ', (input) => {
    console.log('User input:', input);
    portNum = input;
    server.listen(portNum, () => {
      console.log('listening on *' + portNum);
    });  
    rl.close();
  });  
} catch (error) {
  console.log("Port taken");
  console.log(error);
}


