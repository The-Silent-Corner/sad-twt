require("dotenv").config();
const { createTables, wipeDBTables } = require("../../db/databaseHelpers");
const { Student } = require("../../db/Models");
const createStudent = require("../../helpers/student/createStudent");
const request = require("supertest");
const app = require("../../app.js");

beforeAll(async() =>{
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("updating student information", () =>{
  beforeAll(async() =>{
    await createStudent("student_id", "txiong@", "1234");
  });
  it("should update student in model", async() =>{
    const res = await request(app)
      .post("/login/student")
      .send({
        email: "txiong@",
        password: "1234"
      })
      .set("Accept", "application/json");
    let c1 = res["headers"]["set-cookie"][0];
    await request(app)
      .put("/student")
      .send({
        firstName: "Tim",
        lastName: "JOHN",
        bio: "Goodbye Lads",
        gender: "F"
      })
      .set("Accept", "application/json")
      .set("Cookie", [c1]);
    const findStudent = await Student.findOne({ where:{ email: "txiong@" } });
    expect(findStudent.first_name).toBe("Tim");
    expect(findStudent.last_name).toBe("JOHN");
    expect(findStudent.bio).toBe("Goodbye Lads");
    expect(findStudent.gender).toBe("F");
  });
  
});