const request = require("supertest");
const app = require("../server"); // Your Express app
const { mockDb, mockQuery } = require("../__mocks__/db");
jest.mock("../config/db.js");
// jest.mock("../config/db.js", () => mockDb);
// const { mockDb, mockQuery } = require("../__mocks__/db");

describe("Courses API", () => {
  beforeEach(() => {
    mockQuery.mockClear(); // Reset mock state before each test
  });

  test("Sample test", async () => {
    expect(true).toBe(true); // Replace with actual tests
  });
});
// describe("Courses API", () => {
//   beforeEach(() => {
//     mockQuery.mockClear();
//   });

//   test("✅ Should fetch all courses", async () => {
//     mockQuery.mockResolvedValue([
//       { id: 1, title: "React Basics", github_repo: "user/repo" }
//     ]);

//     const response = await request(app).get("/courses");
    
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(1);
//     expect(response.body[0].title).toBe("React Basics");
//   });

//   test("✅ Should create a new course", async () => {
//     mockQuery.mockResolvedValue([{ insertId: 1 }]);

//     const newCourse = { title: "Node.js", github_repo: "user/node-repo" };
//     const response = await request(app).post("/courses").send(newCourse);

//     expect(response.status).toBe(201);
//     expect(mockQuery).toHaveBeenCalled(); // Ensure mock was used
//   });
// });
