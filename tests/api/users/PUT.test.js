const app = require("../../../app");
const request = require("supertest");
const jwtGenerate = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/Users/createUser");
const { Users } = require("../../../db/Models");
const dbHelpers = require("../../../db/databaseHelpers");

const mockUser = { id: 1, email: "user@email.com", password: "123123", type: "student" };

beforeAll(async() => {
  await dbHelpers.createTables();
  await createUser(mockUser);
});

afterAll(async() => {
  await dbHelpers.wipeDBTables();
});

describe("POST /api/users", () => {
  describe("without a jwt token", () => {
    it("should return 401", async() => {
      const res = await request(app)
        .put("/api/users")
        .set("Accept", "application/json");
      expect(res.status).toEqual(401);
    });
  });
  describe("when a JWT token is present", () => {
    describe("if the JWT is valid", () => {
      it("updates the user", async() => {
        const token = jwtGenerate(mockUser.id, mockUser.type);
        const res = await request(app)
          .put("/api/users")
          .set("Accept", "application/json")
          .set("Cookie", [`user=${token}`])
          .send({
            firstName: "spongebob",
            lastName: "squarepants"
          });
        expect(res.status).toEqual(200);
        const user = await Users.findOne({ where: { email: "user@email.com" } });
        expect(user.firstName).toEqual("spongebob");
        expect(user.lastName).toEqual("squarepants");
      });
    });
  });
  describe("first name is not provided", () =>{
    it("should return 400", async() =>{
      const token = jwtGenerate("1", "student");
      const res = await request(app)
        .put("/api/users")
        .set("Accept", "application/json")
        .set("Cookie", [`user=${token}`])
        .send({
          lastName: "squarepants"
        });
      expect(res.status).toEqual(400);
    });
  });
  describe("last name is not provided", () =>{
    it("should return 400", async() =>{
      const token = jwtGenerate("1", "student");
      const res = await request(app)
        .put("/api/users")
        .set("Accept", "application/json")
        .set("Cookie", [`user=${token}`])
        .send({
          firstName: "sponge"
        });
      expect(res.status).toEqual(400);
    });
  });
});