import express from "express";
import role from "./roleApi"
import auth from "./auth.api"
import message from "./messageApi"

const router = express.Router();

router.use("/role", role)
router.use("/auth", auth);
router.use("/message", message )

router.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

export default router;
