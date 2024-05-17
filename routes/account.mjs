import express from "express";
import accountController from "../controllers/account.mjs";
const router = express.Router();

router.put("/:userId/deposit", accountController.depositAccount);

router.put("/:userId/withdraw", accountController.withdrawAccount);

router.put("/:userId/transfer", accountController.transferAccount);
  
export default router;