const db = require("./");
const Models = require("./Models");

async function createTables() {
  await db.authenticate();
  await Models.Parent.sync({force: true});
  await Models.Student.sync({force: true});
  await Models.Tutor.sync({force:true});
}

module.exports = {
  createTables: createTables,
  wipeDBTables: async() => {
    await db.drop();
    await createTables();
  }
};