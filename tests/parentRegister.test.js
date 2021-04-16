const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Parent } = require("../db/Models/index.js");
beforeAll(async() => {
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
})
describe("POST /register/parent", () => {
  it("should register the parent", async() => {
    const res = await request(app)
      .post("/register/parent")
      .send({
        first_name: "Tom",
        last_name: "Timmy",
        email: "TT@gmail.com",
        password: "password"})
      .set("Accept","application/json");
    expect(res.status).toBe(200);
  });
  test("if input data exist in database", async() =>{
    const findParent = await Parent.findOne({where:{email: "TT@gmail.com"}});
    expect(findParent).toBeDefined();
    expect(findParent).not.toBeNull();
  });
});
