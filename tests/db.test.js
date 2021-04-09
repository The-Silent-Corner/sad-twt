const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { wipeDBTables, createTables } = require("../db/databaseHelpers");
const { Student, Parent, Tutor } = require("../db/Models");

beforeAll(async() => {
  await wipeDBTables();
  await createTables();
});

describe("Student Model", () => {
  it("Inserting Value into Student Model", async() => {
    await Student.create({
      student_id: "1",
      first_name: "Tou",
      last_name: "Xiong",
      email: "txiong@",
      gender: "M",
      password: "1234"
    });
    const studentSize = await Student.findAll();
    const theStudent = await Student.findOne({ student_id: "1" });
    expect(theStudent).toBeDefined();
    expect(theStudent.first_name).toEqual("Tou");
  });
});
