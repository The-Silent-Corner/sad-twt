const { Courses } = require("../../db/Models");

async function deleteCourse(courseId, tutorId) {
  if(courseId) {
    try{
      const course = await Courses.destroy({ where:{ id:courseId } });
      return course;
    }catch(err) {
      console.log(err);
      return false;
    }
  }
  else if(tutorId) {
    try{
      const course = await Courses.destroy({ where:{ tutorId:tutorId } });
      return course;
    }catch(err) {
      console.log(err);
      return false;
    }
  }
  return false;
}
module.exports = deleteCourse;