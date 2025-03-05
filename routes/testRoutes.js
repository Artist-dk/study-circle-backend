const express = require('express');
const testController = require('../controllers/testController');
const { logRequest } = require("../middlewares/testMiddleware");
const router = express.Router();

router.get('/', logRequest, testController.getAllTests);
router.get('/:id', logRequest, testController.getTestById);
router.post('/', logRequest, testController.createTest);
router.put('/:id', logRequest, testController.updateTest);
router.delete('/:id', logRequest, testController.deleteTest);

module.exports = router;