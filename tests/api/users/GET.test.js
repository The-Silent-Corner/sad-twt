const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const request = require("supertest");
const createCourse = require("../../../helpers/Courses/createCourse");
const createUser = require("../../../helpers/Users/createUser");
const jwtGenerate = require("../../../helpers/jwtGenerate");

let authCookie;
beforeAll(async() => {
  await createTables();
  await createUser("foo", "foo@email.com", "13", "tutor");
  await createUser("bar", "bar@email.com", "1234", "tutor");
  await createCourse("courseId", "foo", "Algebra 2", 100, 12.50);
  await createCourse("courseId2", "foo", "hello AlgebraI", 100, 12.50);
  await createCourse("courseId3", "bar", "pre Algebra 3", 100, 12.50);
  authCookie = `user=${await jwtGenerate("foo", "tutor")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("GET /api/users", ()=>{
  describe("retrieving all courses that has 'foo' as the tutorId", () =>{
    it("should return a list with two courses in it", async() =>{
      const res = await request(app)
        .get("/api/users")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .query({
          q: "foo"
        });
      expect(res.status).toEqual(200);
      expect(res.body.courses[0].id).toEqual("courseId");
      expect(res.body.courses[1].id).toEqual("courseId2");
      expect(res.body.courses.length).toEqual(2);
    });
  });
  describe("retrieving all courses that has 'bar' as the tutorId", () =>{
    it("should return a list with one course in it", async() =>{
      const res = await request(app)
        .get("/api/users")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .query({
          q: "bar"
        });
      expect(res.status).toEqual(200);
      expect(res.body.courses[0].id).toEqual("courseId3");
      expect(res.body.courses.length).toEqual(1);
    });
  });
  describe("id is not in query", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .get("/api/users")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie]);
      expect(res.status).toEqual(400);
    });
  });
});