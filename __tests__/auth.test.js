const request = require("supertest");
const app = require("../server"); // Ensure this is correctly imported
const db = require("../config/db");

let server;

beforeAll(() => {
  server = app.listen(4000); // Start the server on a test port
});

afterAll(() => {
  server.close(); // Ensure Jest stops the server after tests
});


afterAll(() => {
  db.end(); // Close DB connection after all tests
});

test("✅ Should register a new user successfully", async () => {
  const response = await request(server) // Use server, not app
    .post("/auth/register")
    .send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "Test@1234",
    });

  expect(response.status).toBe(201);
});









































// const request = require("supertest");
// const app = require("../server"); // Import your Express app
// const sinon = require("sinon");
// const User = require("../models/userModel");

// // Mock the database functions
// describe("Auth API Tests", () => {
//   afterEach(() => {
//     sinon.restore();
//   });
//   test("Sample test", () => {
//     expect(true).toBe(true);
//   });
//   test("✅ Should register a new user successfully", async () => {
//     const mockUser = {
//       firstName: "John",
//       lastName: "Doe",
//       userName: "johndoe",
//       email: "johndoe@example.com",
//       password: "Test@1234",
//       confirmPassword: "Test@1234",
//       userType: "user",
//       phoneNo: "1234567890",
//       profilePictureURL: "",
//       description: "Test user"
//     };

//     sinon.stub(User, "findByUsernameOrEmail").yields(null, []);
//     sinon.stub(User, "create").yields(null, 1);

//     const response = await request(app)
//       .post("/auth/register")
//       .send(mockUser);

//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("Account created successfully");
//   });

//   test("❌ Should fail registration if email already exists", async () => {
//     const existingUser = [{ id: 1, email: "johndoe@example.com" }];
//     sinon.stub(User, "findByUsernameOrEmail").yields(null, existingUser);

//     const response = await request(app)
//       .post("/auth/register")
//       .send({
//         firstName: "John",
//         lastName: "Doe",
//         userName: "johndoe",
//         email: "johndoe@example.com",
//         password: "Test@1234",
//         confirmPassword: "Test@1234",
//         userType: "user",
//         phoneNo: "1234567890",
//         profilePictureURL: "",
//         description: "Test user"
//       });

//     expect(response.status).toBe(409);
//     expect(response.body.message).toBe("Username or Email already exists");
//   });

//   test("✅ Should login successfully with valid credentials", async () => {
//     const mockUser = {
//       id: 1,
//       userName: "johndoe",
//       email: "johndoe@example.com",
//       password: "$2b$10$XbRhvJ0TQkUuXjBP2P8fL.C6Thw2L6XQ.v64MnlXbHztrFO1Zxswa" // Hashed version of "Test@1234"
//     };

//     sinon.stub(User, "findByUsernameOrEmail").yields(null, [mockUser]);

//     const response = await request(app)
//       .post("/auth/login")
//       .send({
//         username: "johndoe",
//         password: "Test@1234"
//       });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("token");
//   });

//   test("❌ Should fail login with invalid password", async () => {
//     const mockUser = {
//       id: 1,
//       userName: "johndoe",
//       email: "johndoe@example.com",
//       password: "$2b$10$XbRhvJ0TQkUuXjBP2P8fL.C6Thw2L6XQ.v64MnlXbHztrFO1Zxswa" // Hashed version of "Test@1234"
//     };

//     sinon.stub(User, "findByUsernameOrEmail").yields(null, [mockUser]);

//     const response = await request(app)
//       .post("/auth/login")
//       .send({
//         username: "johndoe",
//         password: "WrongPassword"
//       });

//     expect(response.status).toBe(401);
//     expect(response.body.message).toBe("Invalid credentials");
//   });

//   test("✅ Should logout successfully", async () => {
//     const response = await request(app).post("/auth/logout");
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("Logged out successfully. Clear the token on the client side.");
//   });
// });
