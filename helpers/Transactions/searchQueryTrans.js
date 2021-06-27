const { Transactions, Appointments } = require("../../db/Models");
const { Op } = require("sequelize");

async function searchQueryTrans(userId) {
  try{
    const user = await Transactions.findAll({
      include:[
        {
          model:Appointments,
          where:{
            [Op.or]:[
              { tutorId: userId },
              { studentId: userId }
            ]
          }
        }
      ]
    });
    return user;
  }catch(err)
  {
    console.log("hello");
    throw {
      statusCode: 500,
      message: "orm tool failed"
    };
  }
}
module.exports = searchQueryTrans;