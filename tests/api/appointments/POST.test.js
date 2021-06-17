const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const { Appointments } = require("../../../db/Models");

let studentCookie, tutorCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "Math", 23, 23);
  studentCookie = `user=${await jwtGen("studentId", "student")}`;
  tutorCookie = `user=${await jwtGen("tutorId", "tutor")}`;

});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /api/appointments", () =>{
  describe("creating a new appointment", () =>{
    it("should insert an appointment into model", async() =>{
      const res = await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [tutorCookie])
        .send({
          id: "appId",
          location: "Library",
          courseId: "courseId",
          studentId: "studentId"
        });
      const appointment = await Appointments.findOne({ where:{ id:"appId" } });
      expect(appointment.id).toEqual("appId");
      expect(appointment.location).toEqual("Library");
      expect(appointment.courseId).toEqual("courseId");
      expect(appointment.studentId).toEqual("studentId");
      expect(appointment.tutorId).toEqual("tutorId");
      expect(res.status).toEqual(200);
    });
  });
  describe("id is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [tutorCookie])
        .send({
          location: "Library",
          courseId: "courseId",
          studentId: "studentId"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("location is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [tutorCookie])
        .send({
          id: "appId",
          courseId: "courseId",
          studentId: "studentId"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("courseId is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [tutorCookie])
        .send({
          id: "appId",
          location: "Library",
          studentId: "studentId"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("studentId is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [tutorCookie])
        .send({
          id: "appId",
          location: "Library",
          courseId: "courseId"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("user is not a tutor", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .post("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [studentCookie])
        .send({
          id: "appId",
          location: "Library",
          courseId: "courseId",
          studentId: "studentId"
        });
      expect(res.status).toEqual(401);
    });
  });
});