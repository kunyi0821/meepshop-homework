import { expect } from "chai";
import request from "supertest";
import app from "../../app.mjs"

describe("Integration Tests for User and Account Controllers", () => {

    // cant not get user
    it ("should return user is not exist", async () => {
        const res = await request(app)
            .get("/user/1")
            .send(); 
        expect(res.statusCode).to.equal(404);
        expect(res.body.code).to.equal("0004");
        expect(res.body.message).to.equal("user is not exist.");
    })

    // add user
    it("should add a new user", async () => {
        const res = await request(app)
            .post("/user")
            .send({ userName: "Jhon" }); 

        expect(res.statusCode).to.equal(201);
        expect(res.body.code).to.equal("0000");
        expect(res.body.message).to.equal("Success");
    });

    // can get user
    it("should get the user", async () => {
        const res = await request(app)
            .get("/user/1")
            .send({ userName: "Jhon" }); 

        expect(res.statusCode).to.equal(200);
        expect(res.body.code).to.equal("0000");
        expect(res.body.message).to.equal("Success");
    });

    // can not deposit
    it("should be deposit", async () => {
        const res = await request(app)
            .put("/account/1/deposit")
            .send();

        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal("0002");
        expect(res.body.message).to.equal("amount is necessary.");
    });

    // can depostic
    it("should be depostic", async () => {
        const res = await request(app)
            .put("/account/1/deposit")
            .send({ amount: 100});

        expect(res.statusCode).to.equal(201);
        expect(res.body.code).to.equal("0000");
        expect(res.body.message).to.equal("Success");
    });

    // can withdraw
    it("should be withdraw", async () => {
        const res = await request(app)
            .put("/account/1/withdraw")
            .send({ amount: 100 });

        expect(res.statusCode).to.equal(201);
        expect(res.body.code).to.equal("0000");
        expect(res.body.message).to.equal("Success");
    });

    // can not withdraw
    it("should not be withdraw", async () => {
        const res = await request(app)
            .put("/account/1/withdraw")
            .send({ amount: 100 });

        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal("0003");
        expect(res.body.message).to.equal("Your account balance is insufficient.");
    });

    // can not transfer without transfer user
    it("should not be transfer", async () => {
        const res = await request(app)
            .put("/account/1/transfer")
            .send();

        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal("0005");
        expect(res.body.message).to.equal("transferUserId is not exist.");
    });

    // add transfer user
    it("should add a new user", async () => {
        const res = await request(app)
            .post("/user")
            .send({ userName: "Amy" }); 

        expect(res.statusCode).to.equal(201);
        expect(res.body.code).to.equal("0000");
        expect(res.body.message).to.equal("Success");
    });

    // can not transfer without transfer user
     it("should not be transfer", async () => {
        const res = await request(app)
            .put("/account/1/transfer")
            .send({transferUserId: 2});

        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal("0002");
        expect(res.body.message).to.equal("amount is necessary.");
    });

    // can not transfer without balance
    it("should not be transfer", async () => {
        const res = await request(app)
            .put("/account/1/transfer")
            .send({transferUserId: 2, amount: 100});

        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal("0003");
        expect(res.body.message).to.equal("Your account balance is insufficient.");
    });


    // deposit
    it("should be depostic", async () => {
        const res = await request(app)
            .put("/account/1/deposit")
            .send({ amount: 100});

        expect(res.statusCode).to.equal(201);
        expect(res.body.code).to.equal("0000");
        expect(res.body.message).to.equal("Success");
    });

    // can transfer 
    it("should not be transfer", async () => {
        const res = await request(app)
            .put("/account/1/transfer")
            .send({transferUserId: 2, amount: 100});

        expect(res.statusCode).to.equal(201);
        expect(res.body.code).to.equal("0000");
        expect(res.body.message).to.equal("Success");
    });

});
