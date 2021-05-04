const createAppointment = require("../../../helpers/Appointments/createAppointment");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");

beforeAll(async() =>{
  await createTables();
  await createUser("1", "student@email.com", "password", "student");
  await createUser("2", "tutor@email.com", "password", "tutor");
  await createCourse("1", "2", "Algebra", 12, 20);
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("creating an appointment", () =>{
  it("should return true", async() =>{
    const appointment = await createAppointment("1", "pending", 123, "home", "2", "1", "2");
    expect(appointment).toEqual(true);
  });
});
describe("appointment id already exists", () =>{
  it("should return false", async() =>{
    await createAppointment("1", "pending", 213, "home", "2", "1", "2");
    const appointment2 = await createAppointment("1", "pending", 123, "home", "2", "1", "2");
    expect(appointment2).toEqual(false);
  });
});
describe("status is not provided", () =>{
  it("should return false", async() =>{
    const appointment = await createAppointment("1", 231, "home", "2", "1", "2");
    expect(appointment).toEqual(false);
  });
});