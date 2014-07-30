var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);
var logic = require('./logic');

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});
  
app.use(express.static(path.join(__dirname,'public')));

io.sockets.on('connection', function(socket){
  console.log("user connected");
  logic.initGame(io,socket);
 
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});