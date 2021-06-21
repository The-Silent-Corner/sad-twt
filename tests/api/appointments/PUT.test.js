const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const createAppointment = require("../../../helpers/Appointments/createAppointment");
const { AppointmentStatus } = require("../../../statusConstants");

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
describe("Post /api/appointments", () =>{
  it("should update the status of an appointment from pending to declined", async()=>{
    const res = await request(app)
      .put("/api/appointments")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        id: "appId",
        status: AppointmentStatus.Declined
      });
    expect(res.status).toEqual(204);
  });
  describe("id is not in the body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .put("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          status: AppointmentStatus.Declined
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("status is not in the body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .put("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "appId"
        });
      expect(res.status).toEqual(400);
    });
  });
});