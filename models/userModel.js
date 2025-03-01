const db = require("../config/db"); // Import MySQL connection
const bcrypt = require("bcrypt");

const User = {
  /**
   * Find user by username or email
   */
  findByUsernameOrEmail: (identifier, callback) => {
    const sql = `SELECT * FROM users WHERE username = ? OR email = ?`;
    db.query(sql, [identifier, identifier], (err, results) => {
      if (err) return callback(err, null);
      console.log(results)
      return callback(null, results); // Return first matching user
    });
  },

  /**
   * Create a new user
   */
  create: async (userData, callback) => {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        userType,
        phoneNo,
        profilePictureURL,
        description,
      } = userData;

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO users (firstName, lastName, userName, email, password, userType, phoneNo, profilePictureURL, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [firstName, lastName, userName, email, hashedPassword, userType, phoneNo, profilePictureURL, description],
        (err, results) => {
          if (err) return callback(err, null);
          return callback(null, results.insertId); // Return inserted user ID
        }
      );
    } catch (error) {
      callback(error, null);
    }
  },
};

module.exports = User;
