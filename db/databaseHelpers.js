const db = require("./");
const Models = require("./Models");

async function createTables() {
  await db.authenticate();
  // await Models.Student.sync({ force: true });
  // await Models.Parent.sync({ force: true });
  await Models.Parent.Student.sync({ force: true });
  await Models.Parent.Parent.sync({ force: true });
  // await Models.Parent_Student.sync();
}

module.exports = {
  createTables: createTables,
  wipeDBTables: async() => {
    await db.drop();
    await createTables();
  }
};