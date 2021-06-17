const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const createMessage = require("../../../helpers/Messages/createMessage");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createUser("foo", "foo@email.com", "password", "tutor");
  await createMessage("messageId", "tutorId", "studentId", "welcome");
  await createMessage("messageId2", "tutorId", "studentId", "hw is due");
  await createMessage("messageId3", "tutorId", "studentId", "test is next week");
  await createMessage("messageId4", "foo", "studentId", "Hello");
  authCookie = `user=${await jwtGen("studentId", "student")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("GET /api/message", () =>{
  describe("retrieving a message from model", () =>{
    it("should return a list of 3 messages that has 'tutorId' as senderId", async() =>{
      const res = await request(app)
        .get("/api/messages")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .query({
          q: "tutorId"
        });
      expect(res.body.message.length).toEqual(3);
      expect(res.body.message[0].id).toEqual("messageId");
      expect(res.body.message[1].id).toEqual("messageId2");
      expect(res.body.message[2].id).toEqual("messageId3");
      expect(res.status).toEqual(200);
    });
  });
  describe("id is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .get("/api/messages")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie]);
      expect(res.status).toEqual(400);
    });
  });
});