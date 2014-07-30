 var socket = io.connect('http://localhost:3000');

  socket.on('connect',function(){
    socket.emit('adduser',prompt("What's ur name??"));
  });

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

  function clearMessage(){
     document.getElementById("message").innerHTML = "";
  }