const request = require("supertest");
const app = require("../../app.js");
const { createTables, wipeDBTables } = require("../../db/databaseHelpers.js");
const { Tutor } = require("../../db/Models/index.js");

beforeAll(async() =>{
  await createTables();
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /register/tutor", () =>{
  it("it should register the tutor", async() =>{
    const res = await request(app)
      .post("/register/tutor")
      .set("Accept", "application/json")
      .send({
        email: "Billy@",
        password1: "akljf89023",
        password2: "akljf89023"
      });
    expect(res.status).toBe(200);
  });
  test("email exists in the tutor db", async() =>{
    const findTutor = await Tutor.findOne({ where:{ email:"Billy@" } });
    expect(findTutor).toBeDefined();
    expect(findTutor).not.toBeNull();
  });
  describe("When email is not provided", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/register/tutor")
        .send({
          password1: "password",
          password2: "password"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When the first password is not provided", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/register/tutor")
        .send({
          email: "Billy@",
          password2: "akljf89023"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When the second password is not provided", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/register/tutor")
        .send({
          email: "Billy@",
          password1: "akljf98023"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
  describe("When the passwords do not match", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/register/tutor")
        .send({
          email: "Billy@",
          password1: "akljf98023",
          password2: "wrongPassword"
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(400);
    });
  });
});