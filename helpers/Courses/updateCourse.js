const { Courses, Appointments } = require("../../db/Models");
const {AppointmentStatus} = require("../../statusConstants");

async function updateCourse(body){
  const { id, courseName, initialSessionPrice, sessionHourlyRate } = body;
  const course = await Courses.findOne({where:{id:id}});
  const appointment = await Appointments.findOne({
    where:{
      courseId: id,
      status: {
        [Op.or]:[
          {status: AppointmentStatus.Ongoing},
          {status: AppointmentStatus.Pending}
        ] 
      }
    }
  });
  if(appointment){
    return false;
  }
  if(courseName){
    course.courseName = courseName;
  }
  if(initialSessionPrice){
    course.initialSessionPrice = initialSessionPrice;
  }
  if(sessionHourlyRate){
    course.sessionHourlyRate = sessionHourlyRate;
  }
  await course.save();
  return course;
}
module.exports = updateCourse;