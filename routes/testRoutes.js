const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { logRequest } = require('../middleware/testMiddleware');

router.get('/', logRequest, testController.getTest);
router.post('/', logRequest, testController.postTest);

module.exports = router;
