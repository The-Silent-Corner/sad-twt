const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Parent } = require("../db/Models/index.js");
beforeAll(async() => {
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /register/parent", () => {
  it("should register the parent", async() => {
    const res = await request(app)
      .post("/register/parent")
      .set("Accept", "application/json")
      .send({
        email: "TT@gmail.com",
        password1: "password",
        password2: "password"
      });
    expect(res.status).toBe(200);
  });
  test("if input data exist in database", async() =>{
    const findParent = await Parent.findOne({ where:{ email: "TT@gmail.com" } });
    expect(findParent).toBeDefined();
    expect(findParent).not.toBeNull();
  });
});
