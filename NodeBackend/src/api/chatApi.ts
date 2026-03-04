import express from "express";
import * as controller from "../controllers/ChatController";

const router = express.Router();

router.post("/create", controller.createChatAsync);
router.get("/user/:userId", controller.getChatsByUserIdAsync);
router.get("/chat/:chatId", controller.getChatWithUsersByChatIdAsync);
router.delete("/:id", controller.deleteChatAsync);
router.put("/:id", controller.updateChatAsync);

export default router;
