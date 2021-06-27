const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const createAppointment = require("../../../helpers/Appointments/createAppointment");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "Math", 23, 23);
  await createAppointment("appId", "campus", "courseId", "studentId", "tutorId");
  authCookie = `user=${await jwtGen("studentId", "student")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});

describe("adding a transactions into the transactions model", () =>{
  it("should insert a transaction", async() =>{
    const res = await request(app)
      .post("/api/transactions")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        amount: 1000,
        appointmentId: "appId"
      });
    expect(res.status).toEqual(201);
  });
});
describe("amount is not in the body", () =>{
  it("should return 400", async() =>{
    const res = await request(app)
      .post("/api/transactions")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        appointmentId: "appId"
      });
    expect(res.status).toEqual(400);
  });
});