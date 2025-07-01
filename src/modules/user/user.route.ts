import { Router } from "express";
import * as controller from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerValidator } from "./user.validator";

const router = Router();

router.post("/register", [...registerValidator, validate], controller.register);

// router.post("/", controller.createUser);
// router.get("/", controller.getUsers);
// router.get("/:id", controller.getUserById);
// router.put("/:id", controller.updateUser);
// router.delete("/:id", controller.deleteUser);

// router.post(
//   "/login",
//   query("username").notEmpty(),
//   query("password").notEmpty(),
//   controller.login
// );
// router.post(
//   "/refresh",
//   query("refreshToken").notEmpty(),
//   controller.refreshToken
// );
// router.post(
//   "/forgot-password",
//   query("email").notEmpty(),
//   controller.forgotPassword
// );

export default router;
