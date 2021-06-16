const request = require("supertest");
const createUser = require("../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const app = require("../app");
const cookie = require("cookie");

beforeAll(async() =>{
  await createTables();
  await createUser("1", "txiong@email.com", "password", "student");
});
afterAll(async() =>{
  await wipeDBTables();
});

describe("/api/getAuth", () =>{
  describe("Incorrect email or password", () =>{
    it("should return 401 if wrong email", async() =>{
      const res = await request(app)
        .post("/api/getAuth")
        .set("Accept", "application/json")
        .send({
          email: "wrongEmail@email.com",
          password: "password"
        });
      expect(res.status).toEqual(401);
    });
    it("should return 401 if wrong password", async() => {
      const res = await request(app)
        .post("/api/getAuth")
        .set("accept", "application/json")
        .send({
          email: "txiong@email.com",
          password: "foobar"
        });
      expect(res.status).toEqual(401);
    });
  });

  describe("Sending correct information", () => {
    it("sends the cookie named user", async() => {
      const res = await request(app)
        .post("/api/getAuth")
        .set("accept", "application/json")
        .send({
          email: "txiong@email.com",
          password: "password"
        });
      expect(res.status).toEqual(200);
      const userCookie = cookie.parse(res.headers["set-cookie"][0]);
      expect(userCookie.user).toBeDefined();
    });
  });
});