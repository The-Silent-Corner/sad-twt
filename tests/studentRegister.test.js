const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Student } = require("../db/Models/index.js");
const { registerStudent } = require("../routes/register/studentRegister");

beforeAll(async() => {
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /register/student", () => {
  describe("When email is not provided", () =>{
    it("should return a 400", async() =>{
      const res = await request(app)
        .post("/register/student")
        .send({
          email: null,
          password1: "password",
          password2: "password"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When the first password is not provided", () =>{
    it("should return a 400", async() =>{
      const res = await request(app)
        .post("/register/student")
        .set("Accept", "application/json")
        .send({
          email: "foo@email.com",
          password2: "password"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When the second password is not provided", () =>{
    it("should return a 400", async() =>{
      const res = await request(app)
        .post("/register/student")
        .send({
          email: "foo@gmail.com",
          password1: "123asdf"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("when the passwords do not match", () =>{
    it("should return a 400", async() =>{
      const res = await request(app)
        .post("/register/student")
        .send({
          email: "foo@gmail.com",
          password1: "kl;ja",
          password2: "123asdf"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
});

describe("The student register function", () => {
  it("registers the student", async() => {
    await registerStudent("foobar@email.com", "1234");
    Student.findOne({ where: { email: "foobar@email.com" } })
      .then(data => {
        expect(data.email).toEqual("foobar@email.com");
      });
  });
});