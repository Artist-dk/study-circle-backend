require('dotenv').config();

const express = require('express');
const { stat } = require('fs');
const app = express();
const path = require('path')
const session = require('express-session');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session); 
const fs = require('fs/promises');
const crypto = require('crypto');
const helmet = require('helmet');

const { swaggerDocs } = require('./swagger/main');

const database = require('./config/database');
const BASE_URL = require('./config/url');
// const upload = require('./config/multer');
const router = require("./router");

// const app = express();
const sessionStore = new MySQLStore({}, database);

// Session Middleware
app.use(session({
  key: "userId", 
  secret: 'studycircle',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 
  }
}));


// Static Files
const staticPath = path.join(__dirname,"/public")

console.log(__dirname)
console.log(staticPath)

// CORS Configuration
app.use( cors({
  // origin: '*',
  origin: ['http://192.168.0.21:3000', BASE_URL], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to log session ID
app.use((req, res, next) => {
  console.log(req.session.id)
  next();
});

// Serve static files
app.use(express.static(staticPath));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// used to set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // Allows your site to load its own resources
        "default-src": ["'self'"],
        // Allows React's development scripts and inline styles
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        // Crucial: Allows your frontend (3000) to talk to this backend (8081)
        "connect-src": ["'self'", "http://localhost:8081", "ws://localhost:3000"],
        "img-src": ["'self'", "data:", "blob:"],
        "style-src": ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// Routes
app.use("/", router);
console.log("server.js: testing progressRoutes: ");

app.use((req, res, next) => {
  console.log(req.session.id);
  next();
});





/* Temp start
================================ */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);


// API
app.post("/register", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = new User({ name, email });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

mongoose
  .connect("mongodb://localhost:27017/reactExpressDB")
  .then(() => {
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch(err => console.log(err));

/* Temp end
================================ */



/* Global Error Handler
================================ */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// Start Server
if (process.env.NODE_ENV !== "test") {
  const PORT = 8081;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} \nhttp://localhost:${PORT}`);
  });
  // Setup Swagger docs
  swaggerDocs(app, PORT);
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} \nhttp://localhost:${process.env.PORT}`);
  });  
}
