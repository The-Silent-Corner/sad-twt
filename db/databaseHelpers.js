const db = require("./");
const Models = require("./Models");

async function createTables() {
  await db.authenticate();
  await Models.Student.sync();
  await Models.Parent.sync();
  await Models.Tutor.sync();
//   await Models.Parent_Student.sync();
}

module.exports = {
  createTables: createTables,
  wipeDBTables: async() => {
    await db.drop();
    await createTables();
  }
};