import express from "express";
import * as controller from "../controllers/messageController";

const router = express.Router();

router.post("/create", controller.createMessageAsync);
router.get("/chat/:chatId", controller.getMessagesByChatIdAsync);
router.delete("/:id", controller.deleteMessageAsync);
router.put("/:id", controller.updateMessageAsync);

export default router;
