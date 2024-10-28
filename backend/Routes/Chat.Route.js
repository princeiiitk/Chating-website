import express from 'express';
import { Auth } from '../Middleware/User.Middleware.js';
const router = express.Router();

import {
    accessChats,
    fetchAllChats,
    creatGroup,
    renameGroup,
    addToGroup,
    removeFromGroup,
} from '../Controllers/Chat.Controller.js';
router.post('/', Auth, accessChats);
router.get('/', Auth, fetchAllChats);
router.post('/group', Auth, creatGroup);
router.patch('/group/rename', Auth, renameGroup);
router.patch('/groupAdd', Auth, addToGroup);
router.patch('/groupRemove', Auth, removeFromGroup);
router.delete('/removeuser', Auth);

export default router;