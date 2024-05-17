import Receipt from "../modal/receipt.mjs";

const accountController = {

    depositAccount: async (req, res) => {
        const user_id = parseInt(req.params.user_id);

        const { amount } = req.body;

        const user = global.users.find(user => user.user_id === user_id); 

        if (!user) {
            console.error(`user_id: ${user_id} is not exist.`);
            res.status(400).json({
                code: "0004",
                message: "user is not exist."
            });
            return;
        }

        if (!amount) {
            console.error(`amount is necessary`);
            res.status(400).json({
                code: "0002",
                message: "amount is necessary."
            });
            return;
        }
        
        user.balance += amount;

        const newReceipt = new Receipt(new Date(), amount, user_id, user_id);
        user.transaction_history.push(newReceipt);

        res.status(201).json({
            code: "0000",
            message: "Success"
        });

        return;
    },

    withdrawAccount: async (req, res) => {

        const user_id = parseInt(req.params.user_id);

        const { amount } = req.body;

        const user = global.users.find(user => user.user_id === user_id); 

        if (!user) {
            console.error(`user_id: ${user_id} is not exist.`);
            res.status(400).json({
                code: "0004",
                message: "user is not exist."
            });
            return;
        }

        if (!amount) {
            console.error(`amount is necessary`);
            res.status(400).json({
                code: "0002",
                message: "amount is necessary."
            });
            return;
        }



        if (user.balance < amount) {
            console.error(`user_id: ${user_id} balance is insufficient`);
            res.status(400).json({
                code: "0003",
                message: "Your account balance is insufficient."
            });

            return;
        }

        user.balance -= amount;

        const newReceipt = new Receipt(new Date(), -amount, user_id, user_id);
        user.transaction_history.push(newReceipt);

        res.status(201).json({
            code: "0000",
            message: "Success"
        });

        return;
    },

    transferAccount: async (req, res) => {

        const user_id = parseInt(req.params.user_id);
        const { amount, transfer_user_id } = req.body;

        const user = global.users.find(user => user.user_id === user_id);

        const transfer_user = global.users.find(user => user.user_id === transfer_user_id);

        if (user_id === transfer_user_id) {
            console.error(`Can not transfer to yourself.`);
            res.status(400).json({
                code: "0006",
                message: "Can not transfer to yourself."
            });
            return;
        }

        if (!user) {
            console.error(`user_id: ${user_id} is not exist.`);
            res.status(400).json({
                code: "0004",
                message: "user is not exist."
            });
            return;
        }
  
        if (!transfer_user) {
            console.error(`user_id: ${transfer_user_id} is not exist.`);
            res.status(400).json({
                code: "0005",
                message: "transfer_user_id is not exist."
            });
            return;
        }

        if (!amount) {
            console.error(`amount is necessary`);
            res.status(400).json({
                code: "0002",
                message: "amount is necessary."
            });
            return;
        }


        if (user.balance < amount) {
            console.error(`user_id: ${user_id} balance is insufficient`);
            res.status(400).json({
                code: "0003",
                message: "Your account balance is insufficient."
            });
            return;
        }

        user.balance -= amount;
        transfer_user.balance += amount;

        const userReceipt = new Receipt(new Date(), -amount, user_id, transfer_user_id);
        user.transaction_history.push(userReceipt);

        const tranferReceipt = new Receipt(new Date(), amount, user_id, transfer_user_id);
        transfer_user.transaction_history.push(tranferReceipt);

        res.status(201).json({
            code: "0000",
            message: "Success"
        });

        return;
    }
};
  
export default accountController;