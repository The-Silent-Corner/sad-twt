const app = require("../app");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const request = require("supertest");
const searchQuery = require("../helpers/searchQuery");
const createCourse = require("../helpers/createCourse");
const createUser = require("../helpers/createUser");

let parentToken;
beforeAll(async() => {
  await createTables();
  await createUser("1", "student@email.com", "1234", "student");
  await createUser("2", "tutor@email.com", "1234", "tutor");
  await createUser("3", "parent@email.com", "1234", "parent");
});
 
afterAll(async() =>{
  await wipeDBTables();
});

describe("GET /search", () =>{
  describe("no token", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .get("/api/users");
      expect(res.status).toBe(401);
    });
  });

  describe("token type is parent", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .get("/api/users")
        .set("Cookie", [parentToken]);
      expect(res.status).toBe(401);
    });
  });

  describe("testing the search query", () =>{
    beforeAll(async() => {
      await createCourse("2", "Algebra 2", 100, 12.50);
      await createCourse("2", "hello AlgebraI", 100, 12.50);
      await createCourse("2", "pre Algebra 3", 100, 12.50);
    });
    it("should return 3", async() => {
      const list = await searchQuery("Algebra");
      expect(list.length).toEqual(3);
    });
    it("should return false", async() =>{
      const list = await searchQuery("nothing");
      expect(list).toEqual([]);
    });
  });
});