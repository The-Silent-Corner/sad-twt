const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { wipeDBTables } = require("../db/databaseHelpers");
const {Student, Parent, Tutor} = require("../db/Models");

beforeAll(async() => {
  await wipeDBTables();
});

afterAll(async() => {
  await wipeDBTables();
});

describe("Student Model", () => {
  it("Inserting Value into Student Model", async () => {
    await Student.create({
      student_id: "1",
      first_name: "Tou",
      last_name: "Xiong",
      email: "txiong@",
      gender: "M",
      password: "1234"
    })
    const studentSize = await Student.findAll();
    expect(studentSize.length).toEqual(1);
  })
})
