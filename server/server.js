const express = require('express');
const app = express();

const server = app.listen(8000, () =>
    console.log('The server is all fired up on port 8000')
);

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

var messages=[]
io.on("connection", socket => {
    socket.on("event_from_client", data => { // listens to socket.emit line 27 Chat.jsx
        console.log(data) // data is our submitted formState
        console.log(socket.id)
        messages.push(data)
        console.log(messages)
        io.emit("new_message_from_server", messages) 
        // socket.broadcast.emit("send_data_to_all_other_clients", data);//everyone but OG sender

    })
})