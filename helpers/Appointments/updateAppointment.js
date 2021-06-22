const { Appointments } = require("../../db/Models");

async function updateAppointment(id, status) {
  try{
    const app = await Appointments.findOne({ where:{ id:id } });
    if(!app) {
      throw {
        statusCode: 404,
        message: "appointment not found"
      };
    }
    app.status = status;
    await app.save();
  } catch(err) {
    throw {
      statusCode: 500,
      message: "orm tool failed"
    };
  }
}
module.exports = updateAppointment;