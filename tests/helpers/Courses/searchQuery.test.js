const searchQuery = require("../../../helpers/Courses/searchQuery");
const createCourse = require("../../../helpers/Courses/createCourse");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const createUser = require("../../../helpers/Users/createUser");

beforeAll(async() =>{
  await createTables();
  await createUser("2", "tutor@email.com", "1234", "tutor");
});

afterAll(async() =>{
  await wipeDBTables();
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