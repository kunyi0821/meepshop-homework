import { expect } from "chai";

import userController from "../../controllers/user.mjs";

describe("userController", () => {

    beforeEach(() => {
        global.users = [];
    });

    afterEach(() => {
        delete global.users;
    });

    describe("findUser", () => {
        it("should return the user if it exists", async () => {
            global.users.push({
                userId: 1,
                name: "Jhon",
                balance: 0,
                transactionHistory: []
            })

            const req = { params: { userId: 1 } };
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

            await userController.findUser(req, res);

            expect(res.body).to.exist;
            expect(res.body.data.userId).to.equal(1);
        });

        it("should return 400 if user does not exist", async () => {

            const req = { params: { userId: 100 } };
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

            await userController.findUser(req, res);

            expect(res.status).to.deep.equal(404);
            expect(res.body.code).to.equal("0004");
            expect(res.body.message).to.equal("user is not exist.");
        });
    });

    describe("addUser", () => {
        it("should add a new user", async () => {

        const req = { body: { userName: "Jhon" } };

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

        await userController.addUser(req, res);

        expect(res.status).to.deep.equal(201);
        expect(res.body.code).to.equal("0000");
        expect(global.users.length).to.equal(1);
    });

    it("should return 400 if userName is missing", async () => {
        const req = { body: {userName: ""} };
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

        await userController.addUser(req, res);

        expect(res.status).to.equal(400);
        expect(res.body.code).to.equal("0001");
        expect(res.body.message).to.equal("userName is necessary");
        });
    });
});