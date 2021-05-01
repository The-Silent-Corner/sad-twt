const app = require("../../app");
const request = require("supertest");
const jwtGenerate = require("../../helpers/jwtGenerate");
const createUser = require("../../helpers/createUser");
const { Users } = require("../../db/Models");
const dbHelpers = require("../../db/databaseHelpers");

beforeAll(async() => {
  await dbHelpers.createTables();
});

afterAll(async() => {
  await dbHelpers.wipeDBTables();
});

describe("POST /updateUser", () => {
  describe("without a jwt token", () => {
    it("should return 401", async() => {
      const res = await request(app)
        .post("/updateUser")
        .set("Accept", "application/json");
      expect(res.status).toEqual(401);
    });
  });
  describe("when a JWT token is present", () => {
    describe("if the JWT is valid", () => {
      it("updates the user", async() => {
        await createUser("1", "user@email.com", "123", "student");
        const token = jwtGenerate("1", "student");
        const res = await request(app)
          .post("/updateUser")
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
});