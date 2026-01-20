const express = require("express");
const authController = require("./controllers/userController");
const router = express.Router();
const upload = require('./config/multer');
const multer = require("multer");
const path = require("path");

// controllers */
// const controller = require('./controllers/message');
const { trackProgress, getProgress } = require('./controllers/progressController');
const contactusController = require('./controllers/contactusController');
const { createCourse, getCourses, updateCourse, deleteCourse, getCourseById } = require("./controllers/courseController");
const testController = require('./controllers/testController');
const { getUserEnrollments } = require("./controllers/enrollmentController");
const { enrollUser } = require("./controllers/enrollmentController");
const libraryController = require("./controllers/library");

// middelewares */
const { adminAuth, verifyToken, isAdmin, authMiddleware, authenticateJWT  } = require("./middlewares/userMiddleware");
const { logRequest } = require("./middlewares/testMiddleware");

console.log("router.js: testing router file");

// contactusRoutes */
router.post('/', contactusController.saveMessage);

// accountRoutes */
router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.get("/user/logout", authController.logout);

/* courseRoutes */
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



/**
 * ==============================
 * Multer Configuration (PDF Upload)
 * ==============================
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/books"); // make sure folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Only allow PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// const upload = multer({
//   storage,
//   fileFilter,
// });


/**
 * ==============================
 * Library Routes
 * ==============================
 */

// ➕ Add new book (Admin/Librarian)
router.post(
  "/library/add-new-book",
  upload.single("file"), // frontend key: file
  libraryController.addNewBook
);

// 📚 Get all books
router.get(
  "/library/get-all-books",
  libraryController.fetchAllBooks
);

// 📘 Get single book by ID
router.get(
  "/library/get-book/:bookId",
  libraryController.fetchNewBook
);

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



// // enrollmentRoutes  */



// // enrollmentRoutes  */



// // message  */



// // message  */
// // const Book = require('../models/bookModel');
// // router.get('/fetchUsers', controller.fetchUsers);
// router.post('/fetchUsers', controller.fetchUsers);
// router.post('/fetchUser', controller.fetchUser);
// router.get('/fetchMessages', controller.fetchMessages);
// router.post('/saveMessage', upload.single('file'), controller.saveMessage);
// router.get('/getRecipientId', upload.single('file'), controller.fetchMessages);
// router.get('/recipientDetails', upload.single('file'), controller.fetchMessages);











module.exports = router;
