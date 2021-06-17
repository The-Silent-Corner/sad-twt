const { Courses } = require("../../db/Models");

async function searchQueryUser(id) {
  try{
    const courses = await Courses.findAll({
      where:{
        tutorId: id
      }
    });
    return courses;
  }catch(err) {
    console.log(err);
    return false;
  }

}
module.exports = searchQueryUser;