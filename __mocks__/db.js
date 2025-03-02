const knex = require("knex");
const jestMock = require("jest-mock");

const mockDb = knex({
  client: "mysql2",
  useNullAsDefault: true, // Important for SQLite in-memory DB (optional)
});

const mockQuery = jestMock.fn().mockResolvedValue([]);

mockDb.client.query = mockQuery; // Mock query execution

module.exports = { mockDb, mockQuery };





// const mockQuery = jest.fn();

// const mockDb = {
//   query: mockQuery,
// };

// module.exports = { mockDb, mockQuery };






// const mockDb = jest.fn(() => ({
//   query: jest.fn(),
//   close: jest.fn(),
// }));

// module.exports = { mockDb, mockQuery: jest.fn() };