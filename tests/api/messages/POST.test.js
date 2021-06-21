const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const { Messages } = require("../../../db/Models");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("studentId", "student@email.com", "password", "student");
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  authCookie = `user=${await jwtGen("studentId", "student")}`;
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("POST /api/messages", ()=>{
  describe("creating a new message", () =>{
    it("should insert a new message into model", async() =>{
      const res = await request(app)
        .post("/api/messages")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "messageId",
          senderId: "studentId",
          receiverId: "tutorId",
          message: "I love your class."
        });
      const message = await Messages.findOne({ where:{ id:"messageId" } });
      expect(message.id).toEqual("messageId");
      expect(message.senderId).toEqual("studentId");
      expect(message.receiverId).toEqual("tutorId");
      expect(message.message).toEqual("I love your class.");
      expect(res.status).toEqual(200);
    });
  });
  describe("id is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/messages")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          senderId: "studentId",
          receiverId: "tutorId",
          message: "I love your class."
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("senderId is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/messages")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "messageId",
          receiverId: "tutorId",
          message: "I love your class."
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("receiverId is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/messages")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "messageId",
          senderId: "studentId",
          message: "I love your class."
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("message is not in body", () =>{
    it("should return 400", async() =>{
      const res = await request(app)
        .post("/api/messages")
        .set("Accept", "application/json")
        .set("Cookie", [authCookie])
        .send({
          id: "messageId",
          senderId: "studentId",
          receiverId: "tutorId"
        });
      expect(res.status).toEqual(400);
    });
  });
});