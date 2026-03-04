import express from 'express';
import {
 createMessage,  
 getMessagesByChatId,
 deleteMessage,
 updateMessage
} from '../controllers/message/indexMessageController';

const router = express.Router();

router.post('/create',  createMessage);
router.get("/chat/:chatId", getMessagesByChatId)
router.delete("/:id", deleteMessage)
router.put("/:id", updateMessage)

export default router;