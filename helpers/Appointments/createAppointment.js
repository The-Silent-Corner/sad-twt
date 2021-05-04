const { Appointments } = require("../../db/Models");

async function createAppointment(id, status, time, location, courseId, studentId, tutorId){
  const appointment = await Appointments.findOne({where:{id:id}});
  if(appointment){
    return false
  }
  try{
    await Appointments.create({
      id: id,
      status: status,
      time: time,
      location: location,
      courseId: courseId,
      studentId: studentId,
      tutorId: tutorId
    })
  }catch(err)
  {
    return false
  }
  return true;
}
module.exports = createAppointment