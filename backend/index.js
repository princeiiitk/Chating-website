
import dotenv from "dotenv"
import mongoose from "mongoose";
import * as Server from 'socket.io';
import mongoDBConnect from './dbConection/connection.js';
import { app } from './app.js'
dotenv.config({
    path: './.env'
})
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', false);
mongoDBConnect()



app.get('/', (req, res) => {
    console.log("hello errc");
    res.send("hello world prin")
})
const serverrunning=app.listen(PORT, () => {
    console.log(`Server Listening at PORT - ${PORT}`);
});
const io = new Server.Server(serverrunning, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    },
});
io.on('connection', (socket) => {
    socket.on('setup', (userData) => {
        socket.join(userData.id);
        socket.emit('connected');
    });
    socket.on('join room', (room) => {
        socket.join(room);
    });
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieve) => {
        var chat = newMessageRecieve.chatId;
        if (!chat.users) console.log('chats.users is not defined');
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieve.sender._id) return;
            socket.in(user._id).emit('message recieved', newMessageRecieve);
        });
    });
});



