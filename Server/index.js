
import dotenv from "dotenv"
import mongoose from "mongoose";
import mongoDBConnect from './dbConection/connection.js';
import { app } from './app.js'
dotenv.config({
    path: './.env'
})
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', false);
mongoDBConnect()
app.get('/', (req, res) => {
    console.log("hello");
    res.send("hello")
})
app.listen(PORT, () => {
    console.log(`Server Listening at PORT - ${PORT}`);
});


