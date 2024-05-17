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
                user_id: 1,
                name: "Jhon",
                balance: 0,
                transaction_history: []
            })

            const req = { params: { user_id: 1 } };
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
            expect(res.body.data.user_id).to.equal(1);
        });

        it("should return 400 if user does not exist", async () => {

            const req = { params: { user_id: 100 } };
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

            expect(res.status).to.deep.equal(400);
            expect(res.body.code).to.equal("0004");
            expect(res.body.message).to.equal("user is not exist.");
        });
    });

    describe("addUser", () => {
        it("should add a new user", async () => {

        const req = { body: { user_name: "Jhon" } };

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

    it("should return 400 if user_name is missing", async () => {
        const req = { body: {user_name: ""} };
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
        expect(res.body.message).to.equal("user_name is necessary");
        });
    });
});