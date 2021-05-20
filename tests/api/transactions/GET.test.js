const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const createAppointment = require("../../../helpers/Appointments/createAppointment");
const createTransaction = require("../../../helpers/Transactions/createTransaction");
const { Transactions } = require("../../../db/Models");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "Math", 23, 23);
  await createAppointment("appId", "campus", "courseId", "studentId", "tutorId");
  await createTransaction("tranId", 1000, "appId");
  authCookie = `user=${await jwtGen("studentId", "student")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("GET /api/transactions", () =>{
  describe("no id in body", () =>{
    it("should return 400", async() =>{
      // const res = await request(app)
      //   .get("/api/transactions")
      //   .set("Accept", "application/json")
      //   .set("Cookie", [authCookie]);
      // expect(res.status).toEqual(200);
    });
  }); 
});