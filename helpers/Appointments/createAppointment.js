const { Appointments } = require("../../db/Models");
const { AppointmentStatus } = require("../../statusConstants");

async function createAppointment(id, location, courseId, studentId, tutorId) {
  const appointment = await Appointments.findOne({ where:{ id:id } });
  if(appointment) {
    return false;
  }
  try{
    await Appointments.create({
      id: id,
      status: AppointmentStatus.Pending,
      time: new Date().toISOString(),
      location: location,
      courseId: courseId,
      studentId: studentId,
      tutorId: tutorId
    });
  }catch(err)
  {
    return false;
  }
  return true;
}
module.exports = createAppointment;