const chatForm = document.getElementById('chat-form');
const chatMessages =document.querySelector('.chat-messages');




//get username and room in url from external library
const{username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix : true 
});


const socket = io();
//join room

socket.emit('joinRoom',{username,room});
// get  room users



//Message from sever
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);
});
//scroll down
chatMessages.scrollTop = chatMessages.scrollHeight ;

//message submit

chatForm.addEventListener('submit', (e) => {

    e.preventDefault();
    //get message text
    const msg = e.target.elements.msg.value;
    //emitting a message to server
    socket.emit('chatMessage', msg);
    //clear output
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});


// output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = '<p class="meta">' + message.username + ' <span>' + message.time + '</span></p><p class="text">'+ message.text + '</p>' ;
    document.querySelector('.chat-messages').appendChild(div);
}

