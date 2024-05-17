import { expect } from "chai";
import accountController from "../../controllers/account.mjs";

describe("accountController", () => {

    beforeEach(async() => {
        global.users = [];
    });

    afterEach(() => {
        delete global.users;
    });

    describe("depositAccount", () => {
        it("should return user is missing", async () => {

            const req = { params: {userId: 1}, body: { } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };

            await accountController.depositAccount(req, res);

            expect(res.status).to.deep.equal(404);
            expect(res.body.code).to.equal("0004");
            expect(res.body.message).to.equal("user is not exist.");
        });

        it("should return amount is necessary", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { amount: 0 } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.depositAccount(req, res);


            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0002");
            expect(res.body.message).to.equal("amount is necessary.");
        });

        it("should be success", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { amount: 100 } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.depositAccount(req, res);


            expect(res.status).to.deep.equal(201);
            expect(res.body.code).to.equal("0000");
            expect(res.body.message).to.equal("Success");
        });

    });

    describe("withdrawAccount", () => {
        it("should return user is missing", async () => {

            const req = { params: {userId: 1}, body: { } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };

            await accountController.withdrawAccount(req, res);

            expect(res.status).to.deep.equal(404);
            expect(res.body.code).to.equal("0004");
            expect(res.body.message).to.equal("user is not exist.");
        });

        it("should return amount is necessary", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { amount: 0 } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.withdrawAccount(req, res);


            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0002");
            expect(res.body.message).to.equal("amount is necessary.");
        });

        it("should return balance is insufficient.be success", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { amount: 100 } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.withdrawAccount(req, res);


            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0003");
            expect(res.body.message).to.equal("Your account balance is insufficient.");
        });

        it("should be success", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 100,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { amount: 100 } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.depositAccount(req, res);


            expect(res.status).to.deep.equal(201);
            expect(res.body.code).to.equal("0000");
            expect(res.body.message).to.equal("Success");
        });

    });

    describe("transferAccount", () => {
        it("should return user is missing", async () => {

            const req = { params: {userId: 1}, body: { } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };

            await accountController.transferAccount(req, res);

            expect(res.status).to.deep.equal(404);
            expect(res.body.code).to.equal("0004");
            expect(res.body.message).to.equal("user is not exist.");
        });

        it("should return transfer user is not exist", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: {} };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.transferAccount(req, res);

            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0005");
            expect(res.body.message).to.equal("transferUserId is not exist.");
        });

        it("should return can not transfer to yourself.", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { transferUserId: 1 } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.transferAccount(req, res);


            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0006");
            expect(res.body.message).to.equal("Can not transfer to yourself.");
        });

        it("should return transfer user is not exist", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { transferUserId: 2 } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.transferAccount(req, res);


            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0005");
            expect(res.body.message).to.equal("transferUserId is not exist.");
        });

        it("should return amount is necessary", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

            global.users.push({
                userId: 2,
                name: "Amy",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { transferUserId: 2, } };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.transferAccount(req, res);


            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0002");
            expect(res.body.message).to.equal("amount is necessary.");
        });

        it("should return balance is insufficient.", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

            global.users.push({
                userId: 2,
                name: "Amy",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { transferUserId: 2, amount: 100} };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.transferAccount(req, res);


            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0003");
            expect(res.body.message).to.equal("Your account balance is insufficient.");
        });

        it("should be success", async () => {

            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 100,
                transactionHistory: []
            })

            global.users.push({
                userId: 2,
                name: "Amy",
                balance: 0,
                transactionHistory: []
            })

        
            const req = { params: {userId: 1}, body: { transferUserId: 2, amount: 100} };

            const res = {
                status: (function (status) {
                    this.status = status
                    return this;
                }),
                json: function (body) {
                    this.body = body
                    return this;
                },
            };
            await accountController.transferAccount(req, res);


            expect(res.status).to.deep.equal(201);
            expect(res.body.code).to.equal("0000");
            expect(res.body.message).to.equal("Success");
        });

    });
});