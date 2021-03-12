const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { wipeDBTables } = require("../db/databaseHelpers");

beforeAll(async() => {
  await wipeDBTables();
});

afterAll(async() => {
  await wipeDBTables();
});

describe("GET /", () => {
  let response;
  beforeAll(async() => {
    response = await request.get("/");
  });
  it("should send a 200 status", async() => {
    expect(response.status).toEqual(200);
  });
});
