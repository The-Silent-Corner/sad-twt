const createCourse = require("../../../helpers/Courses/createCourse");
const createUser = require("../../../helpers/Users/createUser");
const { Courses } = require("../../../db/Models");
const dbHelpers = require("../../../db/databaseHelpers");

beforeAll(async() => {
  await dbHelpers.createTables();
});

afterAll(async() => {
  await dbHelpers.wipeDBTables();
});

describe("The createCourse fn", () => {
  it("should insert a course", async() => {
    await createUser("1", "tutor@email.com", "1234", "tutor");
    await createCourse("1", "1", "algebra", 10, 10);
    const course = await Courses.findOne({ where: { tutorId: "1", courseName: "algebra" } });
    expect(course).toBeDefined();
    expect(course).not.toBeNull();
    expect(course.id).toEqual("1");
    expect(course.tutorId).toEqual("1");
    expect(course.courseName).toEqual("algebra");
    expect(course.initialSessionPrice).toEqual(10);
    expect(course.sessionHourlyRate).toEqual(10);
  });
});