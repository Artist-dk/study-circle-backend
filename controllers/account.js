
const db = require('../config/db');
const bcrypt = require('bcrypt');
function generateToken(length = 32) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

const Account = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).send("Username and password are required");
      }
  
      // Fetch user from DB
      db.query(`SELECT * FROM users WHERE username = ?`, [username], async (error, result) => {
        if (error) {
          return res.status(500).send("Server error");
        }
  
        if (!result.length) {
          return res.status(404).send("User not found");
        }
  
        const user = result[0];
  
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).send("Invalid credentials");
        }
  
        // Set session and cookie
        req.session.visited = true;
        req.session.user = user;
        res.status(200).cookie("spy", req.session.id, { maxAge: 1000 * 60 * 10 }).send("Login successful");
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  logout: (req, res) => {
    if(req.session && req.session.id) {
      req.session.destroy();
    }
    res.status(200).clearCookie("spy").send("Loged out");
  },

  createNew: async (req, res) => {
    try {
      const { FirstName, LastName, UserName, Email, Password, confirmPassword, UserType, MobileNo, ProfilePictureURL, Description } = req.body;
  
      console.log(req.body);
  
      // Basic Validations
      if (!FirstName) return res.status(400).send("First Name is required");
      if (!LastName) return res.status(400).send("Last Name is required");
      if (!UserName) return res.status(400).send("Username is required");
      if (!Email) return res.status(400).send("Email is required");
      if (!Password) return res.status(400).send("Password is required");
      if (!Description) return res.status(400).send("Description is required");
      if (Password !== confirmPassword) return res.status(400).send("Password and confirm password do not match");
  
      // Validate Email Format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) return res.status(400).send("Invalid email format");
  
      // Hash Password
      const hashedPassword = await bcrypt.hash(Password, 10);
  
      // Insert into Database
      const sql = `INSERT INTO users (firstName, lastName, userName, email, password, userType, phoneNo, profilePictureURL, description)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      db.query(sql, [FirstName, LastName, UserName, Email, hashedPassword, UserType, MobileNo, ProfilePictureURL, Description], (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send("Duplicate entry: Username or Email already exists");
          }
          console.error("Database error:", err);
          return res.status(500).send("Database error");
        }
  
        res.status(201).send("Account created successfully");
      });
  
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}




module.exports  = Account;