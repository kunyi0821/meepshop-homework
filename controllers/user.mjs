import User from "../model/user.mjs";
import codeType from "./codeType.mjs";

const userController = {
    findUser: async (req, res) => {

        const userId = parseInt(req.params.userId);

        const user = global.users.find(user => user.userId === userId); 

        if (!user) {
            console.error(`userId: ${userId} is not exist.`);
            res.status(404).json({
                code: "0004",
                message: codeType["0004"]
            });
            return;
        }
        
        res.status(200).json({
            code: "0000",
            message: codeType["0000"],
            data: user
        });

        return;
    },

    addUser: async (req, res) => {
        const { userName } = req.body;
        if (!userName) {   
            console.error("userName is necessary");
            res.status(400).json({
                code: "0001",
                message: codeType["0001"]
            });
            return;
        }
        const newUser = new User(userName, 0);
        global.users.push(newUser)

        res.status(201).json({
            code: "0000",
            message: codeType["0000"]
        });
        return;
    },

    getNextUserId() {
        User.lastUserId = (User.lastUserId || 0) + 1;
        return User.lastUserId;
    }
};
  
export default userController;