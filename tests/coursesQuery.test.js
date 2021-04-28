const app = require("../app");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const request = require("supertest");
const searchQuery = require("../helpers/searchQuery");
const createStudent = require("../helpers/student/createStudent");
const createParent = require("../helpers/parent/createParent");
const createTutor = require("../helpers/tutor/createTutor");
const createCourse = require("../helpers/tutor/createCourse");

let parentToken, studentToken, tutorToken;

beforeAll(async() => {
  await createTables();
  await createStudent("student_id", "student@email.com", "1234");
  await createTutor("tutor_id", "tutor@email.com", "1234");
  await createParent("parent_id", "parent@email.com", "1234");

  parentToken = (
    await request(app)
      .post("/login/parent")
      .set("Accept", "application/json")
      .send({ email: "parent@email.com", password: "1234" })
  ).headers["set-cookie"][0];
  studentToken = (
    await request(app)
      .post("/login/student")
      .set("Accept", "application/json")
      .send({ email: "student@email.com", password: "1234" })
  ).headers["set-cookie"][0];
  tutorToken = (
    await request(app)
      .post("/login/tutor")
      .set("Accept", "application/json")
      .send({ email: "tutor@email.com", password: "1234" })
  ).headers["set-cookie"][0];
});
 
afterAll(async() =>{
  await wipeDBTables();
});

describe("the tokens", () => {
  test("The tokens are defined and not null", () => {
    expect(parentToken).toBeDefined();
    expect(parentToken).not.toBeNull();
    expect(studentToken).toBeDefined();
    expect(studentToken).not.toBeNull();
    expect(tutorToken).toBeDefined();
    expect(tutorToken).not.toBeNull();
  });
});
 
describe("GET /search", () =>{
  describe("no token", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .get("/search");
      expect(res.status).toBe(401);
    });
  });

  describe("token type is parent", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .get("/search")
        .set("Cookie", [parentToken]);
      expect(res.status).toBe(401);
    });
  });

  describe("testing the search query", () =>{
    beforeAll(async() => {
      await createCourse("tutor_id", "Algebra 2", 100, 12.50);
      await createCourse("tutor_id", "hello AlgebraI", 100, 12.50);
      await createCourse("tutor_id", "pre Algebra 3", 100, 12.50);
    });
    it("should return 3", async() => {
      const list = await searchQuery("Algebra");
      expect(list.length).toEqual(3);
    });
    it("should return false", async() =>{
      const list = await searchQuery("nothing");
      expect(list).toEqual([]);
    });
  });
});