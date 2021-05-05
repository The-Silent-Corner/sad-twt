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
const createTransaction = require("../../../helpers/Transactions/createTransaction");
const { decode } = require("jsonwebtoken");

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
describe("GET /api/transactions", () =>{
  describe("no id in body", () =>{
    it("should return 400", async() =>{

    });
  }); 
});