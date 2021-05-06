const createAppointment = require("../../../helpers/Appointments/createAppointment");
const createTransaction = require("../../../helpers/Transactions/createTransaction");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");

beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "txiong@", "password", "student");
  await createUser("tutorId", "tutor@", "password", "tutor");
  await createCourse("courseId", "tutorId", "History", 12, 334);
  await createAppointment("appId", "pending", new Date().toISOString(), "campus", "courseId", "studentId", "tutorId");
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("creating a transaction in model", () =>{
  it("should return true", async() =>{
    const transaction = await createTransaction("transactionId", 133234, "appId");
    expect(transaction).toEqual(true);
  });
});
describe("transaction id already exists", () =>{
  it("should return false", async() =>{
    await createTransaction("transactionId", 133234, "appId");
    const transaction2 = await createTransaction("transactionId", 133234, "appId");
    expect(transaction2).toEqual(false);
  });
});
describe("amount is not provided", () =>{
  it("should return false", async() =>{
    const transaction = await createTransaction("transactionId", "appId");
    expect(transaction).toEqual(false);
  });
});