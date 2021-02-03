const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessages = require('./utils/messages');
const {userjoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
//set path as static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatMIXBot';

//run when client connects
io.on('connection', socket => {
    socket.on('joinRoom',({username, room}) => {
        const user = userjoin(socket.id,username, room);
        socket.join(user.room);

        //Currrent user
    socket.emit('message', formatMessages(botName,'Welcome to chatMIX !'));

    //When new user connects
    socket.broadcast.to(user.room).emit('message', formatMessages(botName,user.username + ' joined !'));





    });
  
  

    //listen message 
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessages(user.username,msg));
    });
     
    //when user disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessages(botName,user.username +' Left'));

    

        }

    
        
    } );
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('Server running on port ' + PORT));

