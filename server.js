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

const staticPath = path.join(__dirname,"/public")

console.log(__dirname)
console.log(staticPath)

app.use( cors({
  // origin: '*',
  origin: ['http://192.168.0.21:3000', BASE_URL], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(req.session.id)
  next();
});

app.use(express.static(staticPath));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.use("/", router);
console.log("server.js: testing progressRoutes: ");

app.use((req, res, next) => {
  console.log(req.session.id);
  next();
});


/* Global Error Handler
================================ */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});


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
