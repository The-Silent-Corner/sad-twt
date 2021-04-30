require("dotenv").config();
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const { Users } = require("../db/Models");
const createUser = require("../helpers/createUser");
const UpdateUser = require("../helpers/updateUsers");
beforeAll(async() =>{
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("updating user information", () =>{
  beforeAll(async() =>{
    await createUser("1", "txiong@", "1234", "student");
  });
  it("should update the user's info", async() =>{
    const status = await UpdateUser("1", "Jim", "Doe");
    const user = await Users.findOne({ where:{ id: "1" } });
    expect(status).toEqual(true);
    expect(user.firstName).toBe("Jim");
    expect(user.lastName).toBe("Doe");
    expect(status).toBe(true);
  });
  describe("Can not find id in Users model", () =>{
    it("should return false", async() =>{
      const wrongId = await UpdateUser("23", "jim", "Doe");
      expect(wrongId).toBe(false);
    });
  });
});
