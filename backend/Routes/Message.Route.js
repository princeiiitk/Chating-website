import express from "express";
const router = express.Router();
import { sendMessage, getMessages } from "../Controllers/Message.Controller.js";
import { Auth } from "../Middleware/User.Middleware.js";
router.post("/", Auth, sendMessage);
router.get("/:chatId", Auth, getMessages);
export default router;