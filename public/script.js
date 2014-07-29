 var socket = io();
  $('div').click(function(event){
    socket.emit('clicked', event.target.id);
  });

  socket.on('move', function(grid){
    clearMessage();
    for(var i=1;i<10;i++){
      document.getElementById(i).innerHTML = grid[i-1];
    }
  });
  socket.on('message', function(msg){
  
    document.getElementById("message").innerHTML = msg;
  });	

  socket.on('left',function(){
   document.getElementById("message").innerHTML = "Opponent has left!!!";
  });

  function clearMessage(){
     document.getElementById("message").innerHTML = "";
  }