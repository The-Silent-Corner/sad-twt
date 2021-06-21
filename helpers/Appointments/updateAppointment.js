const { Appointments } = require("../../db/Models");

async function updateAppointment(id, status) {
  try{
    const app = await Appointments.findOne({ where:{ id:id } });
    if(!app) {
      return false;
    }
    app.status = status;
    app.save();
    return app;
  }catch(err) {
    console.log(err);
    return false;
  }
}
module.exports = updateAppointment;