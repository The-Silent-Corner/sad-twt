const { createTables } = require("../db/databaseHelpers");
const { Student, Parent, Tutor } = require("../db/Models");

beforeAll(async() => {
  await createTables();
});

describe("Student Model", () => {
  let student;
  const testStudentData = {
    student_id: "1",
    first_name: "Tou",
    last_name: "Xiong",
    email: "txiong@",
    gender: "M",
    password: "1234"
  };
  const testParentData = {
    parent_id: "123",
    first_name: "pfname",
    last_name: "plname",
    email: "pemail.com",
    password: "pw"
  };

  test("Inserting Value into Student Model", async() => {
    try {
      student = await Student.create(testStudentData);
    } catch(err) {
      console.log("Could not insert Student");
      console.error(err);
    }
    const theStudent = await Student.findOne({ where: { student_id: "1" } });
    expect(theStudent).toBeDefined();
    expect(theStudent.first_name).toEqual("Tou");
  });

  it("has a parent", async() => {
    const p = await Parent.create(testParentData);
    await student.addParent(p);
    const parents = await student.getParents();
    expect(parents.length).toEqual(1);
  });

  it("has many parents", async() => {
    let p2d = { ...testParentData, parent_id: "p2id" },
      p3d = { ...testParentData, parent_id: "p3id" };
    const p2 = await Parent.create(p2d);
    const p3 = await Parent.create(p3d);
    await student.addParents([p2, p3]);
    const s = await student.getParents();
    expect(s.length).toEqual(3);
  });
});

describe("Tutor Model", () =>{
  let tutor;
  const testTutorData = {
    tutor_id: "1234",
    first_name: "Jim",
    last_name: "Moua",
    email: "jmoua@",
    gender: "M",
    password: "Skyrim",
    bio: "I love to code"
  };
  test("inserting values into Tutor table", async() =>{
    try{
      await Tutor.create(testTutorData);
      const tutorResults = await Tutor.findOne({ where: { tutor_id: "1234" } });
      expect(tutorResults).toBeDefined();
      expect(tutorResults.tutor_id).toEqual("1234");
    }catch(err) {
      console.log("could not insert data into Tutor Table");
      console.error(err);
    }

  });
});
