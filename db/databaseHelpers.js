const db = require("./");
const Models = require("./Models");

async function createTables() {
  await db.authenticate();
  await Models.StudentParent.sync({ force: true });
  await Models.Users.sync({ force: true });
  await Models.Courses.sync({ force: true });
  await Models.Appointments.sync({ force: true });
  await Models.Transactions.sync({ force: true });
}

module.exports = {
  createTables: createTables,
  wipeDBTables: async() => {
    await Models.Transactions.drop();
    await Models.Appointments.drop();
    await Models.Courses.drop();
    await Models.Users.drop();
    await Models.StudentParent.drop();
  }
};