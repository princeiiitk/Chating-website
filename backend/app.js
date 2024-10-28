import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './Routes/User.Route.js';
import chatRoutes from './Routes/Chat.Route.js';
import messageRoutes from './Routes/Message.Route.js';
const app = express();
const corsConfig = {
    
    credentials: true,
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);



export {app}