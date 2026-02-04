require('dotenv').config();

const express = require('express');
const http = require('http');
const app = express();

const path = require('path');
const session = require('express-session');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');
const { Server } = require('socket.io');

const { swaggerDocs } = require('./swagger/main');
const database = require('./config/database');
const BASE_URL = require('./config/url');
const router = require("./router");

/* HTTP + Socket Server */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://192.168.0.21:3000', BASE_URL],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

/* Session Setup */
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

/* Static Files */
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

/* CORS */
app.use(cors({
  origin: ['http://192.168.0.21:3000', BASE_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

/* Middlewares */
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Session ID:", req.session.id);
  next();
});

/* Helmet */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "connect-src": [
          "'self'",
          "http://localhost:8081",
          "ws://localhost:8081",
          "http://192.168.0.21:3000"
        ],
        "img-src": ["'self'", "data:", "blob:"],
        "style-src": ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

/* Routes */
app.use("/", router);


// Load all socket modules
require("./socket")(io);

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* Start Server */
if (process.env.NODE_ENV !== "test") {
  const PORT = 8081;
  server.listen(PORT, () => {
    console.log("Server running on port", PORT);
    console.log("http://localhost:" + PORT);
  });
  swaggerDocs(app, PORT);
} else {
  server.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
}
