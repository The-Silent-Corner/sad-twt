const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Student } = require("../db/Models/index.js");

beforeAll(async() => {
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /register/student", () => {
  it("should register the student", async() => {
    const res = await request(app)
      .post("/register/student")
      .send({ 
        first_name: "Tou",
        last_name: "Xiong",
        email: "txiong@",
        gender: "M",
        password: "1234" })
      .set("Accept", "application/json");
    expect(res.status).toBe(200);
  });
  test("if input data exist in database", async() => {
    const findStudent = await Student.findOne({ where:{ email: "txiong@" } });
    expect(findStudent).toBeDefined();
    expect(findStudent).not.toBeNull();
  });
});