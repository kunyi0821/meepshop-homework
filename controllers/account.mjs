import Receipt from "../model/receipt.mjs";
import codeType from "./codeType.mjs";
import InmemoryTransaction from "../model/inmemoryTransaction.mjs";

const accountController = {

    depositAccount: async (req, res) => {
        const userId = parseInt(req.params.userId);

        const { amount } = req.body;

        const user = global.users.find(user => user.userId === userId); 

        if (!user) {
            console.error(`userId: ${userId} is not exist.`);
            res.status(404).json({
                code: "0004",
                message: codeType["0004"]
            });
            return;
        }

        if (!amount) {
            console.error(`amount is necessary`);
            res.status(400).json({
                code: "0002",
                message: codeType["0002"]
            });
            return;
        }
        
        user.balance += amount;

        const newReceipt = new Receipt(new Date(), amount, userId, userId);
        user.transactionHistory.push(newReceipt);

        res.status(201).json({
            code: "0000",
            message: codeType["0000"]
        });

        return;
    },

    withdrawAccount: async (req, res) => {

        const userId = parseInt(req.params.userId);

        const { amount } = req.body;

        const user = global.users.find(user => user.userId === userId); 
        const userIndex = global.users.findIndex(user => user.userId === userId);
        if (!user) {
            console.error(`userId: ${userId} is not exist.`);
            res.status(404).json({
                code: "0004",
                message: codeType["0004"]
            });
            return;
        }

        if (!amount) {
            console.error(`amount is necessary`);
            res.status(400).json({
                code: "0002",
                message: codeType["0002"]
            });
            return;
        }

        if (user.balance < amount) {
            console.error(`userId: ${userId} balance is insufficient`);
            res.status(400).json({
                code: "0003",
                message: codeType["0003"]
            });

            return;
        }

        const transactionManager = new InmemoryTransaction();
        transactionManager.beginTransaction(userId, user);

        try {

            if (user.balance < amount) {
                throw Error();
            }
            user.balance -= amount;
            const newReceipt = { date: new Date(), amount: -amount, userId };
            user.transactionHistory.push(newReceipt);
      
            // Commit transaction
            transactionManager.commitTransaction(userId);
      
            res.status(201).json({ code: "0000", message: codeType["0000"]});

            return;
        } catch (error) {
            // Rollback transaction
            const originalUser = transactionManager.rollbackTransaction(userId);
            if (originalUser) {
                global.users[userIndex] = originalUser;
            }
      
            res.status(500).json({ code: "0007", message: codeType["0007"], error });
            return
        }
    },

    transferAccount: async (req, res) => {

        const userId = parseInt(req.params.userId);
        const { amount, transferUserId } = req.body;

        const user = global.users.find(user => user.userId === userId);
        const userIndex = global.users.findIndex(user => user.userId === userId);

        const transferUser = global.users.find(user => user.userId === transferUserId);
        const transferIndex = global.users.findIndex(user => user.userId === transferUserId);

        if (userId === transferUserId) {
            console.error(`Can not transfer to yourself.`);
            res.status(400).json({
                code: "0006",
                message: codeType["0006"]
            });
            return;
        }

        if (!user) {
            console.error(`userId: ${userId} is not exist.`);
            res.status(404).json({
                code: "0004",
                message: codeType["0004"]
            });
            return;
        }
  
        if (!transferUser) {
            console.error(`userId: ${transferUserId} is not exist.`);
            res.status(400).json({
                code: "0005",
                message: codeType["0005"]
            });
            return;
        }

        if (!amount) {
            console.error(`amount is necessary`);
            res.status(400).json({
                code: "0002",
                message: codeType["0002"]
            });
            return;
        }


        if (user.balance < amount) {
            console.error(`userId: ${userId} balance is insufficient`);
            res.status(400).json({
                code: "0003",
                message: codeType["0003"]
            });
            return;
        }

        const transactionManager = new InmemoryTransaction();
        transactionManager.beginTransaction(userId, user);
        transactionManager.beginTransaction(transferUserId, transferUser);
        try {
            if (user.balance < amount) {
                throw Error();
            }
            user.balance -= amount;
            transferUser.balance += amount;

            const userReceipt = new Receipt(new Date(), -amount, userId, transferUserId);
            user.transactionHistory.push(userReceipt);

            const tranferReceipt = new Receipt(new Date(), amount, userId, transferUserId);
            transferUser.transactionHistory.push(tranferReceipt);

            res.status(201).json({
                code: "0000",
                message: codeType["0000"]
            });

            return;
        } catch (error) {
            // Rollback transaction
            const originalUser = transactionManager.rollbackTransaction(userId);
            if (originalUser) {
                global.users[userIndex] = originalUser;
            }

            const originalTransferUser = transactionManager.rollbackTransaction(transferUserId);
            if (originalTransferUser) {
                global.users[transferIndex] = originalTransferUser;
            }
      
            res.status(500).json({ code: "0007", message: codeType["0007"], error });
            return
        }
    }
};
  
export default accountController;