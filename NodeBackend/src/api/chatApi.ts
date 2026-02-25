import express from 'express';
import {
    createChat,
    getChatWithUsersByChatId,
    getChatsByUserId,
    deleteChat,
    updateChat
} from '../controllers/chat/indexChatController';

const router = express.Router();

router.post('/create',  createChat);
router.get('/user/:userId',  getChatsByUserId);
router.get('/chat/:chatId',  getChatWithUsersByChatId);
router.delete("/:id", deleteChat)
router.put("/:id", updateChat)

export default router;