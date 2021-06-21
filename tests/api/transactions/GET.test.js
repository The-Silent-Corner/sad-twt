const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const createAppointment = require("../../../helpers/Appointments/createAppointment");
const createTransaction = require("../../../helpers/Transactions/createTransaction");

let studentIdCookie, tutorIdCookie, foobarCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createUser("foobar", "foobar@email.com", "password", "student");
  await createCourse("courseId", "tutorId", "Math", 23, 23);
  await createAppointment("appId", "campus", "courseId", "studentId", "tutorId");
  await createAppointment("appId2", "campus", "courseId", "studentId", "tutorId");
  await createAppointment("appId3", "campus", "courseId", "foobar", "tutorId");
  await createTransaction("tranId", 1000, "appId");
  await createTransaction("tranId2", 1000, "appId2");
  await createTransaction("tranId3", 1000, "appId3");
  tutorIdCookie = `user=${await jwtGen("tutorId", "tutor")}`;
  studentIdCookie = `user=${await jwtGen("studentId", "student")}`;
  foobarCookie = `user=${await jwtGen("foobar", "student")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("GET /api/transactions", () =>{
  describe("retrieving a list of transactions that pertains to the user id 'tutorId'", () =>{
    it("should an array the contains three transactions", async() =>{
      const res = await request(app)
        .get("/api/transactions")
        .set("Accept", "application/json")
        .set("Cookie", [tutorIdCookie]);
      expect(res.body.list[0].id).toEqual("tranId");
      expect(res.body.list[1].id).toEqual("tranId2");
      expect(res.body.list[2].id).toEqual("tranId3");
      expect(res.body.list.length).toEqual(3);
      expect(res.status).toEqual(200);
    });
  }); 
  describe("retrieving a list of transactions that pertains to the user id 'studentId'", () =>{
    it("should an array the contains two transactions", async() =>{
      const res = await request(app)
        .get("/api/transactions")
        .set("Accept", "application/json")
        .set("Cookie", [studentIdCookie]);
      expect(res.body.list[0].id).toEqual("tranId");
      expect(res.body.list[1].id).toEqual("tranId2");
      expect(res.body.list.length).toEqual(2);
      expect(res.status).toEqual(200);
    });
  }); 
  describe("retrieving a list of transactions that pertains to the user id 'foobar'", () =>{
    it("should an array the contains one transaction", async() =>{
      const res = await request(app)
        .get("/api/transactions")
        .set("Accept", "application/json")
        .set("Cookie", [foobarCookie]);
      expect(res.body.list[0].id).toEqual("tranId3");
      expect(res.body.list.length).toEqual(1);
      expect(res.status).toEqual(200);
    });
  });
  describe("user querying for a specific transaction", () =>{
    it("should return the transaction with the id 'tranId3", async() =>{
      const res = await request(app)
        .get("/api/transactions")
        .set("Accept", "application/json")
        .set("Cookie", [foobarCookie])
        .query({
          q: "tranId3"
        });
      expect(res.body.transaction.id).toEqual("tranId3");
      expect(res.status).toEqual(200);
    });
  });
});