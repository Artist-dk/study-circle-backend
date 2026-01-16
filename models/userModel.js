const db = require("../config/database"); // Import MySQL connection
const bcrypt = require("bcrypt");

const authModel = {
/**
   * Find user by username OR email
   */
  findByUsernameOrEmail: (identifier, callback) => {
    const sql = `
      SELECT * FROM users
      WHERE userName = ? OR email = ?
      LIMIT 1
    `;

    db.query(sql, [identifier, identifier], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); // single user
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
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
  /**
   * Login user
   */
  login: async (loginData, callback) => {
    try {
      const { identifier, password } = loginData;

      // 1️ind user
      authModel.findByUsernameOrEmail(identifier, async (err, user) => {
        if (err) return callback(err, null);

        if (!user) {
          return callback(null, {
            success: false,
            message: "User not found"
          });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return callback(null, {
            success: false,
            message: "Invalid password"
          });
        }
        
        // Remove password before returning
        delete user.password;

        return callback(null, {
          success: true,
          message: "Login successful",
          user
        });
      });

    } catch (error) {
      callback(error, null);
    }
  }

};

module.exports = authModel;