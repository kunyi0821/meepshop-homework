
class User {
    constructor(name, balance) {
        // Generate unique user ID
        this.user_id = User.getNextUserId(); 
        this.name = name;
        this.balance = balance >= 0 ? balance : 0;
        this.transaction_history = [];
    }

    static getNextUserId() {
        User.lastUserId = (User.lastUserId || 0) + 1;
        return User.lastUserId;
    }
}

// Initialize the static counter
User.lastUserId = 0;

export default User;
