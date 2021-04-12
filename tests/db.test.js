const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const { Student, Parent, Tutor, Messages, Courses } = require("../db/Models");

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
describe("Message Model", () =>{
  const testMessageData = {
    message_id: "0000",
    message: "hello there mate",
    time_sent: new Date(),
    sender: "STUDENT",
    student_id: "1",
    tutor_id: "1234"
  };
  const testStudentData = {
    student_id: "1",
    first_name: "Tou",
    last_name: "Xiong",
    email: "txiong@",
    gender: "M",
    password: "1234"
  };
  const testTutorData = {
    tutor_id: "1234",
    first_name: "Jim",
    last_name: "Moua",
    email: "jmoua@",
    gender: "M",
    password: "Skyrim",
    bio: "I love to code"
  };
  beforeAll(async() => {
    await wipeDBTables();
    await createTables();
    await Student.create(testStudentData);
    await Tutor.create(testTutorData);
    await Messages.create(testMessageData);
  });
  test("student_id foreign key check", async() =>{
    const studentForeignKeyCheck = await Messages.findOne({ where:{ student_id: "1" } });
    expect(studentForeignKeyCheck).toBeDefined();
  });
  test("tutor_id foreign key check", async() =>{
    const tutorForeignKeyCheck = await Messages.findOne({ where:{ tutor_id: "1234" } });
    expect(tutorForeignKeyCheck).toBeDefined();
  });
});
describe("Courses Model", () =>{
  const testCoursesData = {
    course_id: "777",
    course_name: "IT Project Management",
    initial_session_price: "100",
    session_hourly_rate: "12.50",
    tutor_id: "1234"
  };
  const testTutorData = {
    tutor_id: "1234",
    first_name: "Jim",
    last_name: "Moua",
    email: "jmoua@",
    gender: "M",
    password: "Skyrim",
    bio: "I love to code"
  };
  beforeAll(async() =>{
    await wipeDBTables();
    await createTables();
    await Tutor.create(testTutorData);
    await Courses.create(testCoursesData);
  });
  test("inserting data into Courses Model", async() =>{
    const insertTest = Courses.findOne({ where:{ course_id: "777" } });
    expect(insertTest).toBeDefined();
  });
});

