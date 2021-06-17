const { Courses } = require("../../db/Models");
const { Op } = require("sequelize");

async function searchQuery(course) {
  try{
    const list = await Courses.findAll({
      where:{
        courseName: {
          [Op.like]: `%${course}%`
        }
      }
    });
    return list;
  }catch(err) {
    return false;
  }
}
module.exports = searchQuery;