const { Appointments } = require("../../db/Models");
const { Op } = require("sequelize");
async function searchQueryApp(userId) {
  try{
    const list = await Appointments.findAll({
      where:{
        [Op.or]:[
          { tutorId: userId },
          { studentId: userId }
        ]
      }
    });
    return list;
  }catch(err) {
    console.log(err);
    return false;
  }
}
module.exports = searchQueryApp;