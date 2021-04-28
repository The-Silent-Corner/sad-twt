const app = require("../app");
const request = require("supertest");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const createStudent = require("../helpers/student/createStudent");
const createParent = require("../helpers/parent/createParent");
const createTutor = require("../helpers/tutor/createTutor");
beforeAll(async() => {
  await createTables();
});

afterAll(async() => {
  await wipeDBTables();
});

describe("GET /", () => {
  let studentToken, tutorToken, parentToken;

  beforeAll(async() => {
    await createStudent("student_id", "student@email.com", "password");
    await createTutor("tutor_id", "tutor@email.com", "password");
    await createParent("parent_id", "parent@email.com", "password");
    const studentResponse = await request(app)
      .post("/login/student")
      .set("Accept", "application/json")
      .send({ email: "student@email.com", password: "password" });
    const parentResponse = await request(app)
      .post("/login/parent")
      .set("Accept", "application/json")
      .send({ email: "parent@email.com", password: "password" });
    const tutorResponse = await request(app)
      .post("/login/tutor")
      .set("Accept", "application/json")
      .send({ email: "tutor@email.com", password: "password" });
    studentToken = studentResponse["headers"]["set-cookie"][0];
    tutorToken = tutorResponse["headers"]["set-cookie"][0];
    parentToken = parentResponse["headers"]["set-cookie"][0];
  });

  it("retrives the token for all logged in types", () => {
    expect(parentToken).toBeDefined();
    expect(parentToken).not.toBeNull();
    expect(tutorToken).toBeDefined();
    expect(tutorToken).not.toBeNull();
    expect(studentToken).toBeDefined();
    expect(studentToken).not.toBeNull();
  });

  describe("Viewing the homepage as a student", () => {
    let res;
    beforeAll(async() => {
      res = await request(app)
        .get("/")
        .set("Cookie", [studentToken]);
    });
    it("sends a 200", () => {
      expect(res.status).toEqual(200);
    });
    it("sends the correct headers", () => {
      expect(res["header"]["content-type"]).toEqual("text/html; charset=utf-8");
    });
  });

  describe("Viewing the homepage as a parent", () => {
    let res;
    beforeAll(async() => {
      res = await request(app)
        .get("/")
        .set("Cookie", [parentToken]);
    });
    it("sends a 200", () => {
      expect(res.status).toEqual(200);
    });
    it("sends the correct headers", () => {
      expect(res["header"]["content-type"]).toEqual("text/html; charset=utf-8");
    });
  });

  describe("Viewing the homepage as a tutor", () => {
    let res;
    beforeAll(async() => {
      res = await request(app)
        .get("/")
        .set("Cookie", [tutorToken]);
    });
    it("sends a 200", () => {
      expect(res.status).toEqual(200);
    });
    it("sends the correct headers", () => {
      expect(res["header"]["content-type"]).toEqual("text/html; charset=utf-8");
    });
  });
  
  describe("Visiting the homepage without a token", () => {
    it("renders the default homepage", async() => {
      const res = await request(app)
        .get("/");
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual("text/html; charset=utf-8");
    });
  });
});