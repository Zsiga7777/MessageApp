import express from "express";
import * as controller from "../controllers/roleController";

const router = express.Router();

router.post("/create", controller.createRoleAsync);
router.get("/", controller.getAllRolesAsync);
router.get("/:name", controller.getRoleByNameAsync);
router.delete("/:id", controller.deleteRoleAsync);
router.put("/:id", controller.updateRoleAsync);

export default router;
