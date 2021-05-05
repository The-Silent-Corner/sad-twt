const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const { Transactions } = require("../../../db/Models");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const createAppointment = require("../../../helpers/Appointments/createAppointment");
const { AppointmentStatus } = require("../../../statusConstants");
const { TransactionStatus } = require("../../../statusConstants");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "Math", 23, 23);
  await createAppointment("appId", AppointmentStatus.Pending, new Date().toISOString(), "campus", "courseId", "studentId", "tutorId");
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
        id: "tsId",
        payer: "studentId",
        status: TransactionStatus.Pending,
        amount: 1000,
        datePaid: new Date(),
        appointmentId: "appId"
      });
    const transaction = await Transactions.findOne({ where:{ id:"tsId" } });
    expect(res.status).toEqual(200);
    expect(transaction.id).toEqual("tsId");
    expect(transaction.payer).toEqual("studentId");
    expect(transaction.status).toEqual(TransactionStatus.Pending);
    expect(transaction.amount).toEqual(1000);
    expect(transaction.appointmentId).toEqual("appId");
  });
});
describe("status is not in the body", () =>{
  it("should return 400", async() =>{
    const res = await request(app)
      .post("/api/transactions")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        id: "tsId",
        payer: "studentId",
        amount: 1000,
        datePaid: new Date(),
        appointmentId: "appId"
      });
    expect(res.status).toEqual(400);
  });
});