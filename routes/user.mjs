import express from "express";
import userController from "../controllers/user.mjs";
const router = express.Router();

router.get("/:user_id", userController.findUser);

router.post("/", userController.addUser);
  
export default router;