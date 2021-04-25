const app = require("../app");
const { Student, Parent, Tutor } = require("../db/Models");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const request = require("supertest");
const bcrypt = require("bcrypt");

beforeAll(async() =>{
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});

describe("PUT/student", () =>{
  beforeAll(async() =>{
    const pw = "1234";
    try {
      hashedPassword = await bcrypt.hash(pw, 10);
    } catch(err) {
      console.log("Errors while hashing password for student login test:");
      console.err(err);
    }
    await Student.create({
      student_id: "very_fancy_id",
      first_name: "JIMBO",
      last_name: "Will",
      gender: "M",
      email: "txiong@",
      password: hashedPassword
    });
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
        bio: "Goodbye Lads"
      })
      .set("Accept", "application/json")
      .set("Cookie", [c1]);
    const findStudent = await Student.findOne({ where:{ student_id: "very_fancy_id" } });
    expect(findStudent.first_name).toBe("Tim");
    expect(findStudent.last_name).toBe("JOHN");
    expect(findStudent.bio).toBe("Goodbye Lads");
  
  });
});