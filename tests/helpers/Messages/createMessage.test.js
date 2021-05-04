const createMessage = require("../../../helpers/Messages/createMessage");
const createUser = require("../../../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");

beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "hel", "password", "student");
  await createUser("tutorId", "jka", "pasd", "tutor");
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("creating a message", () =>{
  it("should return true", async() =>{
    const message = await createMessage("messageId", "studentId", "tutorId", "hello");
    expect(message).toEqual(true);
  });
});
describe("message id already exists", () =>{
  it("should return false", async() =>{
    await createMessage("messageId", "studentId", "tutorId", "hello");
    const message2 = await createMessage("messageId", "studentId", "tutorId", "hello");
    expect(message2).toEqual(false);
  });
});
describe("message is not provided", () =>{
  it("should return false", async() =>{
    const message = await createMessage("messageId", "studentId", "tutorId");
    expect(message).toEqual(false);
  });
});

