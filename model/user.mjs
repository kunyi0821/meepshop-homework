import userController from "../controllers/user.mjs";

class User {
    constructor(name, balance) {
        // Generate unique user ID
        this.userId = userController.getNextUserId(); 
        this.name = name;
        this.balance = balance >= 0 ? balance : 0;
        this.transactionHistory = [];
    }
}

// Initialize the static counter
User.lastUserId = 0;

export default User;
