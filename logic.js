 // Global declarations 
 var win_list = [
  {a:1,b:2,c:3},
  {a:4,b:5,c:6},
  {a:7,b:8,c:9},
  {a:1,b:4,c:7},
  {a:2,b:5,c:8},
  {a:3,b:6,c:9},
  {a:1,b:5,c:9},
  {a:3,b:5,c:7}
  ];
 var grid = ["","","","","","","","",""];  
 var x_flag = false;
 var o_flag = true;
 var win = false;
 var count = 0;
 var users_count = 0;
 var io;
 var socket;
 var usernames = {};
 var rooms = ['room1','room2'];
//Thids will be called when a new user is added for initializing the game
exports.initGame = function(sio, gamesocket){
  io = sio;
  socket = gamesocket;
  //Host Events
  socket.on('adduser',adduser);
  socket.on('clicked',clicked);
  socket.on('disconnect',disconnect);
}

//////////////////
//Host Functions//
//////////////////
function adduser(username){
  socket.username = username;
  socket.room = 'room1';
  usernames[username] = username;
  socket.join('room1');
  socket.emit('message',"you have connected!!!");
  socket.broadcast.to('room1').emit('message',username +" has connected to this room!!!");
};
function clicked(id){
   
   logicForMoving(id);		  
   checkWinorDrawn(); 
    
  };

 function disconnect(){
    console.log('Other player left..');
    delete usernames[socket.username];
    socket.broadcast.to('room1').emit('message',socket.username+" has disconnected!!!!");
    socket.leave(socket.room);
  };

//this function checks the logic about drawing 'X' or 'O' on client
 function logicForMoving(id){
  if(grid[id-1] == "") 
   {
    if (x_flag == false) {
 
      for(var i=0;i<8;i++){
        for (var j in win_list[i]){
         if (win_list[i][j] == id)
          {  
            win_list[i][j] = "X";
            grid[id-1] = "X"
            
          }
        }

      }
      io.sockets.in(socket.room).emit('move',grid);
      x_flag = true;
      o_flag = false; 
    }
    else{

      for(var i=0;i<8;i++){
        for (var j in win_list[i]){
         if (win_list[i][j] == id)
          {  
            win_list[i][j] = "O";
            grid[id-1] = "O"
            
          }
        }

        }
        io.sockets.in(socket.room).emit('move',grid);
        o_flag = true; 
        x_flag = false;
    }
   } 
   else{
      io.emit('message', "This box is already clicked!!!!");
   }
 }

//this function checks the "Win" and "Drawn" conditions
 function checkWinorDrawn(){
    for(var i=0;i<8;i++){
      
      if((win_list[i]["a"] == win_list[i]["b"]) && (win_list[i]["b"] == win_list[i]["c"]) && (win_list[i]["c"] == "X")){
          win = true;
          io.sockets.in(socket.room).emit('message', "X won the game!!!!");
        }
        else if((win_list[i]["a"] == win_list[i]["b"]) && (win_list[i]["b"] == win_list[i]["c"]) && (win_list[i]["c"] == "O")){
          win = true;
          io.sockets.in(socket.room).emit('message', "O won the game!!!!");
        }
      
    }  

    for (var i=1;i<10;i++){
      if(grid[i] != "")
      {
        count = count + 1;
      }
    }
    if((count == 9) && (win == false)) {
        io.sockets.in(socket.room).emit('message', "Game is drawn!!!!");
    }
    else{
        count = 0;
    }
 }
