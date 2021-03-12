// This script is used in the package.json file to create the database + tables.
const { createTables } = require("./databaseHelpers");
(async() => {
  await createTables();
})();