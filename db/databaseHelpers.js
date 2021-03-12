const db = require("./");
const Models = require("./Models");

async function createTables() {
  await db.authenticate();
  await Models.ExampleModel.sync();
}

module.exports = {
  createTables: createTables,
  wipeDBTables: async() => {
    await db.drop();
    await createTables();
  }
};