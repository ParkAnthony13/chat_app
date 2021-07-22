const express = require('express');
const app = express();

const server = app.listen(8000, () =>
    console.log('The server is all fired up on port 8000')
);

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });


io.on("connection", socket => {
    console.log(socket.id);
    console.log("Nice to meet you. (shake hand)")
    socket.emit("Welcome","welcome message") // first parameter represents socket.on("connection_name",) app.js line 14 string, sec para is data sent to connected clients
    socket.on("event_from_client", data => { // listens to socket.emit line 27 Chat.jsx
        console.log(data) // data is our submitted formState
        socket.emit("new_message_from_server", data) // only sends to particular socket
        console.log("socket.emit")
        socket.broadcast.emit("send_data_to_all_other_clients", data);//everyone but OG sender
        console.log("broadcast.emit")
        // io.emit("connection_name", data) sends to all including sender
    })
})


// io.emit emits an event to all connected clients
// socket.broadcast.emit emits an event to all clients other than this particular one, referenced by the socket variable
// socket.emit emits an event directly to this specific client