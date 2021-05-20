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
  await createUser("foobar", "foobar@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "Math", 23, 23);
  await createAppointment("appId", "campus", "courseId", "studentId", "tutorId");
  await createAppointment("appId2", "campus", "courseId", "foobar", "tutorId");
  await createAppointment("appId3", "campus", "courseId", "foobar", "tutorId");
  authCookie = `user=${await jwtGen("studentId", "student")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});

describe("GET /api/appointments", () =>{
  describe("finding an appointment that has 'studentId' for its studentId", ()=>{
    it("should return 200", async() =>{
      const res = await request(app)
        .get("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "studentId"
        });
      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(1);
    });
  });
  describe("finding appointments that has 'foobar' for its studentId", ()=>{
    it("should return 200", async() =>{
      const res = await request(app)
        .get("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "foobar"
        });
      expect(res.body.length).toEqual(2);
      expect(res.status).toEqual(200);
    });
  });
  describe("finding appointments that has 'foobar' for its studentId", ()=>{
    it("should return 200", async() =>{
      const res = await request(app)
        .get("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "foobar"
        });
      expect(res.body.length).toEqual(2);
      expect(res.status).toEqual(200);
    });
  });
  describe("finding appointments that has 'tutorId' for its tutorId", ()=>{
    it("should return 200", async() =>{
      const res = await request(app)
        .get("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "tutorId"
        });
      expect(res.body.length).toEqual(3);
      expect(res.status).toEqual(200);
    });
  });
  describe("userId is provided not in body", ()=>{
    it("should return 400", async() =>{
      const res = await request(app)
        .get("/api/appointments")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie]);
      expect(res.status).toEqual(400);
    });
  });
});