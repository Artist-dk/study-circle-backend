exports.up = function (knex) {
  return knex.schema.createTable("enrollments", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.integer("course_id").unsigned().notNullable();
      table.timestamp("enrolled_at").defaultTo(knex.fn.now());

      table.unique(["user_id", "course_id"]);
      table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.foreign("course_id").references("id").inTable("courses").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("enrollments");
};
