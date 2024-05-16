import User from "../modal/user.mjs";

const userController = {
    findUser: async (req, res) => {

        const user_id = parseInt(req.params.user_id);

        const user = global.users.find(user => user.user_id === user_id); 

        if (!user) {
            console.error(`user_id: ${user_id} is not exist.`);
            res.status(400).json({
                code: "0004",
                message: "user is not exist."
            });
            return;
        }
        
        res.status(200).json(user);

        return;
    },

    addUser: async (req, res) => {

        const { user_name } = req.body;

        if (!user_name) {
            console.error("user_name is necessary");
            res.status(400).json({
                code: "0001",
                message: "user_name is necessary"
            });

            return;
        }
        const newUser = new User(user_name, 0);
        global.users.push(newUser)

        res.status(201).json({
            code: "0000",
            message: "Success"
        });

        return;
    }
};
  
export default userController;