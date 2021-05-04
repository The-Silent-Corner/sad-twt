const createMessage = require("../../../helpers/Messages/createMessage");
const createUser = require("../../../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");

beforeAll(async() =>{
  await createTables();
  await createUser("1", "hel", "password", "student");
  await createUser("2", "jka", "pasd", "tutor");
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("creating a message", () =>{
  it("should return true", async() =>{
    const message = await createMessage("99", "1", "2", "hello");
    expect(message).toEqual(true);
  });
});
describe("message id already exists", () =>{
  it("should return false", async() =>{
    await createMessage("99", "1", "2", "hello");
    const message2 = await createMessage("99", "1", "2", "hello");
    expect(message2).toEqual(false);
  });
});
describe("message is not provided", () =>{
  it("should return false", async() =>{
    const message = await createMessage("99", "1", "2");
    expect(message).toEqual(false);
  });
});

