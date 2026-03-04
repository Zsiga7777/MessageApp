import express from "express";
import validateSchema from "../validations/validateSchema";
import * as controller from "../controllers/authController";
import { AuthJWTAsync } from "../middleware/authJWTMiddleware";
import { registerUserSchema } from "../validations/registerUserValidation";
import { activateUserSchema } from "../validations/activateUserValidation";
import { forgotPasswordSchema } from "../validations/forgotPasswordValidation";
import { resetPasswordSchema } from "../validations/resetPasswordValidation";
import { loginUserSchema } from "../validations/loginUserValidation";
import { changeOldPasswordSchema } from "../validations/changeOldPasswordValidation";

const router = express.Router();

router.post(
  "/register",
  validateSchema(registerUserSchema),
  controller.registerUserAsync,
);
router.post(
  "/activate",
  validateSchema(activateUserSchema),
  controller.activateUserAsync,
);
router.post(
  "/forgotPassword",
  validateSchema(forgotPasswordSchema),
  controller.forgotPasswordAsync,
);
router.post(
  "/resetPassword",
  validateSchema(resetPasswordSchema),
  controller.resetPasswordAsync,
);
router.post("/login", validateSchema(loginUserSchema), controller.loginAsync);
router.post(
  "/changePassword",
  AuthJWTAsync,
  validateSchema(changeOldPasswordSchema),
  controller.changePasswordAsync,
);

export default router;
