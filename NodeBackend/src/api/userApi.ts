import express from "express";
import * as controller from "../controllers/userController";

const router = express.Router();

router.get("/", controller.getAllUsersAsync);
router.get("/:email", controller.getUserByEmailAsync);
router.delete("/:id", controller.deleteUserAsync);
router.put("/:id", controller.updateUserAsync);

export default router;
