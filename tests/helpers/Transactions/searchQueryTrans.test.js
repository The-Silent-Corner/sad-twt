const createAppointment = require("../../../helpers/Appointments/createAppointment");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const app = require("../../../app");
const request = require("supertest");
const createTransaction = require("../../../helpers/Transactions/createTransaction");
const jwtGen = require("../../../helpers/jwtGenerate");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "txiong@", "password", "student");
  await createUser("tutorId", "tutor@", "password", "tutor");
  await createUser("testId", "asfd@", "password", "tutor");
  await createCourse("courseId", "tutorId", "History", 12, 334);
  await createAppointment("appId", "campus", "courseId", "studentId", "tutorId");
  await createAppointment("test", "campus", "courseId", "studentId", "testId");
  await createTransaction("tranId", 100, "appId");
  authCookie = `user=${await jwtGen("studentId", "student")}`;

});
afterAll(async() =>{
  await wipeDBTables();
});
describe("GET Transactions", () =>{
  it("should retrieve a transaction from the model", async() =>{
    const res = await request(app);
    //   .get("/api/transactions")
    //   .set("Accept", "application/json")
    //   .set("Cookie", [authCookie])
    //   .query({
    //     id: "tranId"
    //   });
    // expect(res.body.transaction.id).toEqual("tranId");
    // expect(res.body.transaction.status).toEqual("Not Paid");
    // expect(res.body.transaction.amount).toEqual(100);
    // expect(res.body.transaction.payer).toBeNull();
    // expect(res.body.transaction.appointmentId).toEqual("appId");
  });
  it("should retrieve multiple transactions from the model", async() =>{
    const res = await request(app);
    // .get("/api/transactions")
    // .set("Accept", "application/json")
    // .set("Cookie", [authCookie]);
  });
});