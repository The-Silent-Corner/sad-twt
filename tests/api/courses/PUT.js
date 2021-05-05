const updateCourse = require("../../../helpers/Courses/updateCourse");
const createCourse = require("../../../helpers/Courses/createCourse");
const createUser = require("../../../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const request = require("supertest");
const app = require("../../../app");

beforeAll(async() =>{
  await createTables();
  await createUser("tutorId","tutor@email.com","password","tutor");
  await createCourse("courseId","tutorId","History",10,20); 
})
afterAll(async() =>{
  await wipeDBTables();
})
describe("updating a course in database", () =>{
  it("should update the course name 'History' to 'Math'", async() =>{
    const res = await request(app)
      .put("/api/courses")
      .set("Accept","application/json")
      .send({
        id: "courseId",
        courseName: "Math"
      })
    expect(res.status).toEqual(200);
    expect(res.body.course.courseName).toEqual("Math");
  });
})