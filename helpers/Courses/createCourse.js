const { Courses } = require("../../db/Models");

async function createCourse(id, tutorId, courseName, initSessionPrice, hourlySessionPrice) {
  await Courses.create({
    id: id,
    courseName: courseName,
    initialSessionPrice: initSessionPrice,
    sessionHourlyRate: hourlySessionPrice,
    tutorId: tutorId
  });
}

module.exports = createCourse;