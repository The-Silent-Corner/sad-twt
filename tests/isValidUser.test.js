const createUser = require("../helpers/Users/createUser");
const isValidUser = require("../helpers/isValidUser");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");

beforeAll(async() =>{
  await createTables();
  await createUser("1", "user@email.com", "password", "student");
});
afterAll(async() =>{
  await wipeDBTables();
});

describe("User does not exist in model", () =>{
  it("should return false", async() =>{
    const res = await isValidUser("wrongUser@email.com", "password");
    expect(res).toEqual(false);
  });
});
describe("password does not match with password in model", () =>{
  it("should return false", async() =>{
    const res = await isValidUser("user@email.com", "wrongPassword");
    expect(res).toEqual(false);
  });
});
describe("user is valid user", () =>{
  it("should return user type and id", async() =>{
    const res = await isValidUser("user@email.com", "password");
    expect(res.type).toEqual("student");
    expect(res.id).toEqual("1");
  });
});