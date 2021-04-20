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
      .set("Accept", "application/json")
      .send({
        email: "Billy@",
        password1: "akljf89023",
        password2: "akljf89023"
      });
    expect(res.status).toBe(200);
  });
  test("email exists in the tutor db", async() =>{
    const findTutor = await Tutor.findOne({ where:{ email:"Billy@" } });
    expect(findTutor).toBeDefined();
    expect(findTutor).not.toBeNull();
  });
});