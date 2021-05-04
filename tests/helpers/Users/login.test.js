const request = require("supertest");
const createUser = require("../../../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const app = require("../../../app");

beforeAll(async() =>{
  await createTables();
  await createUser("1", "txiong@", "password", "student");
});
afterAll(async() =>{
  await wipeDBTables();
});

describe("login endpoint test", () =>{
  describe("user is not a valid user", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          email: "wrongEmail",
          password: "password"
        });
      expect(res.status).toEqual(401);
    });
  });
});