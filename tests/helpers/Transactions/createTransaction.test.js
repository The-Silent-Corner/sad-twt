const createAppointment = require("../../../helpers/Appointments/createAppointment");
const createTransaction = require("../../../helpers/Transactions/createTransaction");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");

beforeAll(async() =>{
  await createTables();
  await createUser("1", "txiong@", "password", "student");
  await createUser("2", "tutor@", "password", "tutor");
  await createCourse("1", "2", "History", 12, 334);
  await createAppointment("1", "pending", new Date().toISOString(), "campus", "2", "1", "2");
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("creating a transaction in model", () =>{
  it("should return true", async() =>{
    const transaction = await createTransaction("1", "almost paid", 133234, new Date().toISOString(), "1");
    expect(transaction).toEqual(true);
  });
});
describe("transaction id already exists", () =>{
  it("should return false", async() =>{
    await createTransaction("1", "almost paid", 133234, 234, "1");
    const transaction2 = await createTransaction("1", "almost paid", 133234, new Date().toISOString(), "1");
    expect(transaction2).toEqual(false);
  });
});
describe("status is not provided", () =>{
  it("should return false", async() =>{
    const transaction = await createTransaction("1", 133234, new Date().toISOString(), "1");
    expect(transaction).toEqual(false);
  });
});