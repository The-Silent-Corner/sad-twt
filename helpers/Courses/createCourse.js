const { Courses } = require("../../db/Models");
const { v4 } = require("uuid");

async function createCourse(tutorId, courseName, initSessionPrice, hourlySessionPrice) {
  await Courses.create({
    id: v4(),
    courseName: courseName,
    initialSessionPrice: initSessionPrice,
    sessionHourlyRate: hourlySessionPrice,
    tutorId: tutorId
  });
}

module.exports = createCourse;