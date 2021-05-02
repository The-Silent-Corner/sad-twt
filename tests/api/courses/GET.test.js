const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const request = require("supertest");
const createCourse = require("../../../helpers/Courses/createCourse");
const createUser = require("../../../helpers/Users/createUser");
const jwtGenerate = require("../../../helpers/jwtGenerate");

let parentToken, studentToken;
beforeAll(async() => {
  await createTables();
  await createUser("1", "student@email.com", "1234", "student");
  await createUser("2", "tutor@email.com", "1234", "tutor");
  await createUser("3", "parent@email.com", "1234", "parent");
  parentToken = `user=${await jwtGenerate("3", "parent")}`;
  studentToken = `user=${await jwtGenerate("3", "student")}`;
});
 
afterAll(async() =>{
  await wipeDBTables();
});

describe("GET /api/courses", () =>{
  describe("no token", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .get("/api/courses");
      expect(res.status).toBe(401);
    });
  });

  describe("token type is parent", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .get("/api/courses")
        .set("Cookie", [parentToken]);
      expect(res.status).toBe(401);
    });
  });
  
  describe("query string does not exist", () => {
    it("shoudld return 400", async() => {
      const res = await request(app)
        .get("/api/courses")
        .set("Cookie", [studentToken])
        .query({});
      expect(res.status).toEqual(400);
    });
  });
  describe("query string is less than 3 characters", () => {
    it("shoudld return 400", async() => {
      const res = await request(app)
        .get("/api/courses")
        .set("Cookie", [studentToken])
        .query({
          q: "12"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("a valid string", () =>{
    beforeAll(async() => {
      await createCourse("2", "Algebra 2", 100, 12.50);
      await createCourse("2", "hello AlgebraI", 100, 12.50);
      await createCourse("2", "pre Algebra 3", 100, 12.50);
    });
    it("should return a list", async() => {
      const res = await request(app)
        .get("/api/courses")
        .set("Cookie", [studentToken])
        .query({
          q: "Algebra"
        });
      expect(res.body.list).toBeDefined();
      expect(res.body.list).not.toBeNull();
    });
  });
});