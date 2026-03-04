import express from "express";
import role from "./roleApi";
import auth from "./auth.api";
import message from "./messageApi";
import chat from "./chatApi";
import user from "./userApi";
const router = express.Router();

router.use("/role", role);
router.use("/auth", auth);
router.use("/message", message);
router.use("/chat", chat);
router.use("/user", user);

router.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

export default router;
