import express from "express";
import accountController from "../controllers/account.mjs";
const router = express.Router();

router.put("/:user_id/deposit", accountController.depositAccount);

router.put("/:user_id/withdraw", accountController.withdrawAccount);

router.put("/:user_id/transfer", accountController.transferAccount);
  
export default router;