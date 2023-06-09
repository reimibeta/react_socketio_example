const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    // console.log('User Connected: ' + socket.id);
    socket.on("send_message", (data) => {
        // console.log(data);
        // socket.broadcast.emit("receive_message", data);
        socket.to(data.room).emit("receive_message", data);
    });
    // check this tomorrow
});

// socket.on('disconnect', function(data){
//     socket.broadcast.to(data.room).emit('user_leave', {user_name: "johnjoe123", sid: socket.id});
// });
// const sales = io.of("/sales");
// sales.on("connection", (socket) => {
//     socket.on("join_room", (data) => {
//         socket.join(data);
//     });
//     // console.log('User Connected: ' + socket.id);
//     socket.on("send_message", (data) => {
//         // console.log(data);
//         // socket.broadcast.emit("receive_message", data);
//         socket.to(data.room).emit("receive_message", data);
//     });
// });
// sales.on('disconnect', function(){
//     // .to(data.room)
//     // socket.broadcast.emit('user_leave', {user: "johnjoe123", sid: socket.id});
//     console.log('user_leave', socket.id);
// });

server.listen(3001, () => console.log('server running on port 3001'));

