const request = require("supertest");
const createUser = require("../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const app = require("../app");
const jwtVerify = require("../helpers/jwtVerify");

beforeAll(async() =>{
  await createTables();
  await createUser("1", "txiong@", "password", "student");
});
afterAll(async() =>{
  await wipeDBTables();
});

describe("login endpoint test", () =>{
  describe("user is not a valid user", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          email: "wrongEmail",
          password: "password"
        });
      expect(res.status).toEqual(401);
    });
  });

  describe("email is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          password: "Password"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("password is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          email: "txiong@"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("checking for cookie called user", () =>{
    it("should return a cookie", async() =>{
      const res = await request(app)
        .post("/login")
        .set("Accept", "application/json")
        .send({
          email: "txiong@",
          password: "password"
        });
      const cookie = `${res.headers["set-cookie"]}`;
      const user = cookie.substring(0, 4);
      const end = cookie.indexOf(";");
      const payload = cookie.substring(5, end);
      const decoded = await jwtVerify(payload, process.env.SECRET);
      expect(decoded.user).toEqual("1");
      expect(decoded.type).toEqual("student");
      expect(user).toEqual("user");
    });
  });
});