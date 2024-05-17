class InMemoryTransaction {
    constructor() {
        this.snapshots = new Map();
    }
  
    beginTransaction(key, data) {
        if (this.snapshots.has(key)) {
            throw new Error("Transaction already in progress for this key");
        }
        this.snapshots.set(key, JSON.stringify(data));
    }

    rollbackTransaction(key) {
        if (this.snapshots.has(key)) {
            const snapshot = JSON.parse(this.snapshots.get(key));
            this.snapshots.delete(key);
            return snapshot;
        }
        
        return null;
    }

    commitTransaction(key) {
        if (this.snapshots.has(key)) {
            this.snapshots.delete(key);
        }
    }
}

export default InMemoryTransaction;