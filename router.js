const express = require("express");
const router = express.Router();
const upload = require('./config/multer');
const multer = require("multer");
const path = require("path");

// controllers */
// const controller = require('./controllers/message');
const { trackProgress, getProgress } = require('./controllers/progressController');
const testController = require('./controllers/testController');
const { getUserEnrollments } = require("./controllers/enrollmentController");
const { enrollUser } = require("./controllers/enrollmentController");

// middelewares */
const { adminAuth, verifyToken, isAdmin, authMiddleware, authenticateJWT  } = require("./middlewares/userMiddleware");
const { logRequest } = require("./middlewares/testMiddleware");
const jwtAuth = require("./middlewares/jwtAuth.js");

console.log("router.js: testing router file");


// jwtAuth
// router.get('/auth/me', jwtAuth);
router.get("/auth/me", jwtAuth, (req, res) => {
  res.json({
    authenticated: true,
    user: req.user, // { id, role, email }
  });
});

// contactusRoutes */
const contactusController = require('./controllers/contactusController');
router.post('/', contactusController.saveMessage);


// accountRoutes */
const authController = require("./controllers/userController");
router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.get("/user/logout", authController.logout);


/**
 * ==============================
 * Multer Configuration (PDF Upload) - Library Routes
 * ==============================
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/books");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// const upload = multer({
//   storage,
//   fileFilter,
// });


// Only allow PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};



/**
 * ==============================
 * Library Routes
 * ==============================
 */

const libraryController = require("./controllers/library");
router.post("/library/add-new-book",upload.single("file"), libraryController.addNewBook);
router.get("/library/get-all-books", libraryController.fetchAllBooks);
router.get("/library/get-book/:bookId", libraryController.fetchNewBook);

const fileRoutes = require("./routes/fileRoutes");
router.use("/library/download-book", fileRoutes);

// above works fine



/*  messanger  */
router.post("/message",contactusController.saveMessage)


// // message  */



// message  */
// const Book = require('../models/bookModel');
const MessageController = require('./controllers/message.js');
router.get('/fetchUsers', MessageController.fetchUsers);
router.post('/fetchUsers', MessageController.fetchUsers);
router.post('/fetchUser', MessageController.fetchUser);
router.get('/fetchMessages', MessageController.fetchMessages);
router.post('/saveMessage', upload.single('file'), MessageController.saveMessage);
router.get('/getRecipientId', upload.single('file'), MessageController.fetchMessages);
router.get('/recipientDetails', upload.single('file'), MessageController.fetchMessages);



/* courseRoutes */
const { createCourse, getCourses, updateCourse, deleteCourse, getCourseById } = require("./controllers/courseController");
router.get("/courses/", getCourses);
router.get("/courses/:id", getCourseById);
router.post("/courses/", createCourse);
// router.post("/", adminAuth, createCourse);
// router.put("courses/:id", verifyToken, isAdmin, updateCourse);
router.put("/courses/:id", updateCourse);
// router.delete('/:id', isAdmin, deleteCourse);
router.delete('/courses/:id', deleteCourse);

// progressRoutes */
router.post('/progress/:lessonId', verifyToken, trackProgress);
router.get('/progress/:courseId', verifyToken, getProgress);

console.log("progressRoutes.js: testing progressRoutes ");

// testRoutes */

router.get('/test/', testController.getAllTests);
router.get('/test/:id', logRequest, testController.getTestById);
router.post('/test/', logRequest, testController.createTest);
router.put('/test/:id', logRequest, testController.updateTest);
router.delete('/test/:id', logRequest, testController.deleteTest);



// // enrollmentRoutes  */
// router.get("/enrollments/:userId", verifyToken, getUserEnrollments);
router.get("/enroll/:userId", getUserEnrollments);
router.post("/enroll/", verifyToken, enrollUser);
// router.post("/enroll/", enrollUser);



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // enrollmentRoutes  */













module.exports = router;
