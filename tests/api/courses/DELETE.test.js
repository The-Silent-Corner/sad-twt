const createCourse = require("../../../helpers/Courses/createCourse");
const createUser = require("../../../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const request = require("supertest");
const app = require("../../../app");
const jwtGen = require("../../../helpers/jwtGenerate");
const { Courses } = require("../../../db/Models");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createUser("foobar", "tutor2@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "History", 10, 20);
  await createCourse("courseId2", "foobar", "Math", 10, 20);
  await createCourse("courseId3", "foobar", "Music", 10, 20);
  authCookie = `user=${await jwtGen("tutorId", "tutor")}`;
});

afterAll(async() =>{
  await wipeDBTables();
});

describe("DELETE /api/courses", ()=>{
  describe("deleting a course in model with courseId in body", () =>{
    it("should delete the course with 'courseId' as its id", async() =>{
      const res = await request(app)
        .delete("/api/courses")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          courseId: "courseId"
        });
      const course = await Courses.findOne({ where:{ id:"courseId" } });
      expect(course).toBeNull();
      expect(res.status).toEqual(204);
    });
  });
  describe("there is nothing in the body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .delete("/api/courses")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie]);
      expect(res.status).toEqual(400);
    });
  });
});