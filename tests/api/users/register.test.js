const request = require("supertest");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const app = require("../../../app");
const { Users } = require("../../../db/Models");

beforeAll(async() => {
  await createTables();
});

afterAll(async() => {
  await wipeDBTables();
});

describe("registering a user", () => {
  describe("register a valid user type", () => {
    describe("a tutor", () => {
      it("registers a tutor", async() => {
        const res = await request(app)
          .post("/api/users")
          .set("Accept", "application/json")
          .send({
            email: "tutor@email.com",
            password1: "password",
            password2: "password",
            type: "tutor"
          });
        expect(res.status).toEqual(200);
        const u = await Users.findOne({ where: { email: "tutor@email.com" } });
        expect(u).toBeDefined();
        expect(u).not.toBeNull();
      });

    });
    describe("a parent", () => {
      it("registers a parent", async() => {
        const res = await request(app)
          .post("/api/users")
          .set("Accept", "application/json")
          .send({
            email: "parent@email.com",
            password1: "password",
            password2: "password",
            type: "parent"
          });
        expect(res.status).toEqual(200);
      });
    });
    describe("a student", () => {
      it("registers a student", async() => {
        const res = await request(app)
          .post("/api/users")
          .set("Accept", "application/json")
          .send({
            email: "student@email.com",
            password1: "password",
            password2: "password",
            type: "student"
          });
        expect(res.status).toEqual(200);
      });
    });
  });
  describe("registering as a non valid user type", () => {
    let res;
    beforeAll(async() => {
      res = await request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .send({
          email: "user@email.com",
          password1: "123",
          password2: "123",
          type: "asdf"
        });
    });
    it("should fail", () => {
      expect(res.status).toEqual(400);
    });
  });
});