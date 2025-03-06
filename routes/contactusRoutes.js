const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactusController');

router.post('/', controller.saveMessage);

module.exports = router;
