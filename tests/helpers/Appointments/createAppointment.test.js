const createAppointment = require("../../../helpers/Appointments/createAppointment");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const createUser = require("../../../helpers/Users/createUser");
const createCourse = require("../../../helpers/Courses/createCourse");
const { AppointmentStatus } = require("../../../statusConstants");

beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "Algebra", 12, 20);
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("creating an appointment", () =>{
  it("should return true", async() =>{
    const appointment = await createAppointment("appId", AppointmentStatus.Pending, new Date().toISOString(), "home", "courseId", "studentId", "tutorId");
    expect(appointment).toEqual(true);
  });
});
describe("appointment id already exists", () =>{
  it("should return false", async() =>{
    await createAppointment("appId", AppointmentStatus.Accepted, new Date().toISOString(), "home", "courseId", "studentId", "tutorId");
    const appointment2 = await createAppointment("appId", AppointmentStatus.Declined, new Date().toISOString(), "home", "courseId", "studentId", "tutorId");
    expect(appointment2).toEqual(false);
  });
});
describe("status is not provided", () =>{
  it("should return false", async() =>{
    const appointment = await createAppointment("appId", new Date().toISOString(), "home", "courseId", "studentId", "tutorId");
    expect(appointment).toEqual(false);
  });
});