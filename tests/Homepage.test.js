const app = require("../app");
const request = require("supertest");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const bcrypt = require("bcrypt");
const Models = require("../db/Models");

beforeAll(async() => {
  await createTables();
});

afterAll(async() => {
  await wipeDBTables();
});

describe("GET /", () => {
  let studentToken, tutorToken, parentToken;
  beforeAll(async() => {
    const hashedPw = await bcrypt.hash("password", 10);
    const studentInfo = {
      student_id: "1",
      first_name: "foo",
      last_name: "bar",
      gender: "M",
      email: "foobar@email.com",
      password: hashedPw,
      bio: "hello"
    };
    const tutorInfo = {
      tutor_id: "2",
      first_name: "foo",
      last_name: "bar",
      gender: "M",
      email: "foobar@email.com",
      bio: "hi",
      password: hashedPw
    };
    const parentInfo = {
      parent_id: "3",
      first_name: "foo",
      last_name: "bar",
      email: "foobar@email.com",
      password: hashedPw
    };
    await Models.Student.create(studentInfo);
    await Models.Tutor.create(tutorInfo);
    await Models.Parent.create(parentInfo);
    const studentResponse = await request(app)
      .post("/login/student")
      .set("Accept", "application/json")
      .send({ email: "foobar@email.com", password: "password" });
    const parentResponse = await request(app)
      .post("/login/parent")
      .set("Accept", "application/json")
      .send({ email: "foobar@email.com", password: "password" });
    const tutorResponse = await request(app)
      .post("/login/tutor")
      .set("Accept", "application/json")
      .send({ email: "foobar@email.com", password: "password" });
    studentToken = studentResponse["headers"]["set-cookie"][0];
    tutorToken = tutorResponse["headers"]["set-cookie"][0];
    parentToken = parentResponse["headers"]["set-cookie"][0];
  });
  it("retrieved the tokens", () => {
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