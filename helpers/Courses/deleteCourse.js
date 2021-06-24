const { Courses } = require("../../db/Models");

async function deleteCourse(courseId) {
  try{
    const course = await Courses.findOne({
      where: {
        id: courseId
      }
    });
    if(!course) {
      throw {
        statusCode: 404,
        message: "course not found"
      };
    }
    await course.destroy();
  }catch(err) {
    throw {
      statusCode: 500,
      message: "orm tool failed"
    };
  }
}
module.exports = deleteCourse;