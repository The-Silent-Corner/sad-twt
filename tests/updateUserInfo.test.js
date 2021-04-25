require("dotenv").config();
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const { Student, Tutor, Parent } = require("../db/Models");
const { updateStudentInfo } = require("../helpers/updateUserInfo");

beforeAll(async() =>{
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("updating student information", () =>{
  beforeAll(async() =>{
    await Student.create({
      student_id: "1",
      first_name: "Tou",
      last_name: "Xiong",
      email: "txiong@",
      gender: "M",
      password: "1234",
      bio: "Hello there my friend"
    });
  });
  it("should update student this student's info", async() =>{
    const foundId = await updateStudentInfo("1", "Jim", "Doe", "I love games");
    const findStudent = await Student.findOne({ where:{ student_id: "1" } });
    expect(findStudent.first_name).toBe("Jim");
    expect(findStudent.last_name).toBe("Doe");
    expect(findStudent.bio).toBe("I love games");
    expect(foundId).toBe(true);
  });
  describe("Id not found in model", () =>{
    it("should return false", async() =>{
      const wrongId = await updateStudentInfo("23", "jim", "Doe", "I love games");
      expect(wrongId).toBe(false);
    });
  });
});
