const { Courses } = require("../db/Models");
const { Op } = require("sequelize");

async function searchQuery(course) {
  const list = await Courses.findAll({
    where:{
      course_name: {
        [Op.like]: `%${course}%`
      }
    }
  });
  return list;
}
module.exports = searchQuery;