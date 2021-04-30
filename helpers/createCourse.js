const { Courses } = require("../db/Models");
const { v4 } = require("uuid");

async function createCourse(tutorId, courseName, initSessionPrice, hourlySessionPrice) {
  await Courses.create({
    courses_id: v4(),
    course_name: courseName,
    initial_session_price: initSessionPrice, 
    session_hourly_rate: hourlySessionPrice,
    tutor_id: tutorId
  });
}

module.exports = createCourse;