const { Transactions, Appointments } = require("../../db/Models");
const { Op } = require("sequelize");

async function searchQueryTrans(userId) {
  try{
    const appointment = await Appointments.findAll({
      where:{
        [Op.or]:[
          { tutorId: userId },
          { studentId: userId }
        ]
      }
    });
    const transactions = await Transactions.findAll({
      where:{
        appointmentId: appointment //need to access id from appointment somehow
      }
    });
    return transactions;
  }catch(err)
  {
    console.log(err);
    return false;
  }
}
module.exports = searchQueryTrans;