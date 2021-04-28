const request = require("supertest");
const app = require("../../app.js");
const { createTables, wipeDBTables } = require("../../db/databaseHelpers.js");
const { Parent } = require("../../db/Models/index.js");
beforeAll(async() => {
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /register/parent", () => {
  it("should register the parent", async() => {
    const res = await request(app)
      .post("/register/parent")
      .set("Accept", "application/json")
      .send({
        email: "TT@gmail.com",
        password1: "password",
        password2: "password"
      });
    expect(res.status).toBe(200);
  });
  test("if input data exist in database", async() =>{
    const findParent = await Parent.findOne({ where:{ email: "TT@gmail.com" } });
    expect(findParent).toBeDefined();
    expect(findParent).not.toBeNull();
  });
  describe("When email is not provided", () => {
    it("should return a 400", async() => {
      const res = await request(app)
        .post("/register/parent")
        .send({
          email: null,
          password1: "password",
          password2: "password"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When the first password is not provided", () => {
    it("should return a 400", async() => {
      const res = await request(app)
        .post("/register/parent")
        .send({
          email: "TT@gmail.com",
          password1: null,
          password2: "password"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When second password is not provided", () => {
    it("should return a 400", async() => {
      const res = await request(app)
        .post("/register/parent")
        .send({
          email: "TT@gmail.com",
          password1: "password",
          password2: null
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When the passwords do not match", () =>{
    it("should return a 400", async() =>{
      const res = await request(app)
        .post("/register/parent")
        .send({
          email: "TT@gmail.com",
          password1: "password",
          password2: "wrongPassword"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
});
