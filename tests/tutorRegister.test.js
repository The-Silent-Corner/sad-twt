const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Tutor } = require("../db/Models/index.js");

beforeAll(async() =>{
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /register/tutor", () =>{
  it("it should register the tutor", async() =>{
    const res = await request(app)
      .post("/register/tutor")
      .send({
        first_name: "Bill",
        last_name: "Bob",
        email: "Billy@",
        gender: "M",
        password: "akljf89023",
        bio: "Hello, my name is Bill Bob" })
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
  });
  test("if input data exist in database", async() =>{
    const findTutor = await Tutor.findOne({ where:{ email:"Billy@" } });
    expect(findTutor).toBeDefined();
    expect(findTutor).not.toBeNull();
  });
});