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
      .set("Accept", "application/json")
      .send({
        email: "foo@email.com",
        password1: "123asdf",
        password2: "123asdf"
      });
    expect(res.status).toBe(200);
  });
  test("email was registered in the database", async() => {
    const findStudent = await Student.findOne({ where:{ email: "foo@email.com" } });
    expect(findStudent).toBeDefined();
    expect(findStudent).not.toBeNull();
  });
});