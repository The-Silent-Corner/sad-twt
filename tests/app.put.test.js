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

//Student
describe("PUT/student", () =>{
  beforeAll(async() =>{
    const pw = "1234";
    let hashedPassword;
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
        bio: "Goodbye Lads",
        gender: "F"
      })
      .set("Accept", "application/json")
      .set("Cookie", [c1]);
    const findStudent = await Student.findOne({ where:{ student_id: "very_fancy_id" } });
    expect(findStudent.first_name).toBe("Tim");
    expect(findStudent.last_name).toBe("JOHN");
    expect(findStudent.bio).toBe("Goodbye Lads");
    expect(findStudent.gender).toBe("F");
  
  });
});

//Parent
describe("PUT/parent", () =>{
  beforeAll(async() =>{
    const pw = "1234";
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(pw, 10);
    } catch(err) {
      console.log("Errors while hashing password for parent login test:");
      console.err(err);
    }
    await Parent.create({
      parent_id: "testing",
      first_name: "John",
      last_name: "Wick",
      gender: "M",
      email: "jwick@",
      password: hashedPassword
    });
  });
  it("should update parent in model", async() =>{
    const res = await request(app)
      .post("/login/parent")
      .send({
        email: "jwick@",
        password: "1234"
      })
      .set("Accept", "application/json");
    let c1 = res["header"]["set-cookie"][0];
    await request(app)
      .put("/parent")
      .send({
        firstName: "Keanu",
        lastName: "Reeves"
      })
      .set("Accept", "application/json")
      .set("Cookie", [c1]);
    const findParent = await Parent.findOne({ where:{ parent_id: "testing" } });
    expect(findParent.first_name).toBe("Keanu");
    expect(findParent.last_name).toBe("Reeves");
    
  });
});

//Tutor
describe("PUT/tutor", () =>{
  beforeAll(async() =>{
    const pw = "1234";
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(pw, 10);
    } catch(err) {
      console.log("Errors while hashing password for tutor login test:");
      console.err(err);
    }
    await Tutor.create({
      tutor_id: "1234",
      first_name: "Jim",
      last_name: "Moua",
      email: "jwick@",
      gender: "M",
      password: hashedPassword,
      bio: "I love to code"
    });
  });
  it("should update tutor in model", async() =>{
    const res = await request(app)
      .post("/login/tutor")
      .send({
        email: "jwick@",
        password: "1234"
      })
      .set("Accept", "application/json");
    let c1 = res["header"]["set-cookie"][0];
    await request(app)
      .put("/tutor")
      .send({
        firstName: "Peter",
        lastName: "Griffin", 
        bio: "I am a Family Guy",
        gender: "F"
      })
      .set("Accept", "application/json")
      .set("Cookie", [c1]);
    const findTutor = await Tutor.findOne({ where:{ tutor_id: "1234" } });
    expect(findTutor.first_name).toBe("Peter");
    expect(findTutor.last_name).toBe("Griffin");
    expect(findTutor.bio).toBe("I am a Family Guy");
    expect(findTutor.gender).toBe("F");
  });
});