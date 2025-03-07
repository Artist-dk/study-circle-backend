/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("users").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("users", function (table) {
        table.increments("id").primary();
        table.string("firstName", 50).notNullable();
        table.string("lastName", 50).notNullable();
        table.string("userName", 50).notNullable();
        table.string("email", 100).notNullable().unique(); // ✅ Unique constraint
        table.string("password", 255).notNullable();
        table.enu("role", ["admin", "user"]).defaultTo("user");
        table.string("phoneNo", 15).nullable();
        table.text("profilePictureURL").nullable();
        table.text("description").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    }
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};

