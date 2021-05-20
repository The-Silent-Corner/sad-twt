const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const createAppointment = require("../../../helpers/Appointments/createAppointment");
const createTransaction = require("../../../helpers/Transactions/createTransaction");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "Math", 23, 23);
  await createAppointment("appId", "campus", "courseId", "studentId", "tutorId");
  await createTransaction("transId", 100, "appId");
  authCookie = `user=${await jwtGen("studentId", "student")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("PUT /api/transactions", () =>{
  it("should update a transaction in the model", async() =>{
    const res = await request(app)
      .put("/api/transactions")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        id: "transId",
        status: "pending",
        payer: "studentId"
      });
    expect(res.status).toEqual(200);
    expect(res.body.trans.status).toEqual("pending");
    expect(res.body.trans.payer).toEqual("studentId");
  });
  describe("id is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .put("/api/transactions")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          status: "pending",
          payer: "studentId"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("status is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .put("/api/transactions")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "transId",
          payer: "studentId"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("payer is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .put("/api/transactions")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "transId",
          status: "pending"
        });
      expect(res.status).toEqual(400);
    });
  });
});