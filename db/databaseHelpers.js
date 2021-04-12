const db = require("./");
const Models = require("./Models");

async function createTables() {
  await db.authenticate();
  await Models.ParentStudent.sync({ force:true });
  await Models.Parent.sync({ force: true });
  await Models.Student.sync({ force: true });
  await Models.Tutor.sync({ force:true });
  await Models.Messages.sync({ force:true });
  await Models.Courses.sync({ force:true });
  await Models.Appointment.sync({ force: true });
}

module.exports = {
  createTables: createTables,
  wipeDBTables: async() => {
    await Models.Messages.drop();
    await Models.Appointment.drop();
    await Models.ParentStudent.drop();
    await Models.Student.drop();
    await Models.Parent.drop();
    await Models.Courses.drop();
    await Models.Tutor.drop();
  }
};