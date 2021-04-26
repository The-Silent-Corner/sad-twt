require("dotenv").config();
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const { Student, Tutor, Parent } = require("../db/Models");
const { updateStudentInfo, updateParentInfo, updateTutorInfo } = require("../helpers/updateUserInfo");

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
  it("should update this student's info", async() =>{
    const foundId = await updateStudentInfo("1", "Jim", "Doe", "I love games", "F");
    const findStudent = await Student.findOne({ where:{ student_id: "1" } });
    expect(findStudent.first_name).toBe("Jim");
    expect(findStudent.last_name).toBe("Doe");
    expect(findStudent.bio).toBe("I love games");
    expect(findStudent.gender).toBe("F");
    expect(foundId).toBe(true);
  });
  describe("Id not found in model", () =>{
    it("should return false", async() =>{
      const wrongId = await updateStudentInfo("23", "jim", "Doe", "I love games", "F");
      expect(wrongId).toBe(false);
    });
  });
});
describe("updating Parent Information", () =>{
  beforeAll(async() =>{
    await Parent.create({
      parent_id: "123",
      first_name: "pfname",
      last_name: "plname",
      email: "pemail.com",
      password: "pw"
    });
  });
  it("should update this parent's info", async() =>{
    const foundId = await updateParentInfo("123", "Keanu", "Reeves");
    const findParent = await Parent.findOne({ where:{ parent_id:"123" } });
    expect(findParent.first_name).toBe("Keanu");
    expect(findParent.last_name).toBe("Reeves");
    expect(foundId).toBe(true);
  });
  describe("Id not found in model", () =>{
    it("should return false", async() =>{
      const wrongId = await updateParentInfo("wrongID", "Keanu", "Reeves");
      expect(wrongId).toBe(false);
    });
  });
});
describe("updating Tutor's information", () => {
  beforeAll(async() => {
    await Tutor.create({
      tutor_id: "1234",
      first_name: "Jim",
      last_name: "Moua",
      email: "jmoua@",
      gender: "M",
      password: "Skyrim",
      bio: "I love to code"
    });
  });
  it("should update this tutor's info in model", async() =>{
    const foundId = await updateTutorInfo("1234", "Tou", "Xiong", "Hello World", "F");
    const findTutor = await Tutor.findOne({ where:{ tutor_id:"1234" } });
    expect(findTutor.first_name).toBe("Tou");
    expect(findTutor.last_name).toBe("Xiong");
    expect(findTutor.bio).toBe("Hello World");
    expect(findTutor.gender).toBe("F");
    expect(foundId).toBe(true);
  });
  it("should return false", async() =>{
    const wrongId = await updateParentInfo("wrongId", "Tou", "Xiong", "Hello World", "F");
    expect(wrongId).toBe(false);
  });
  
});
