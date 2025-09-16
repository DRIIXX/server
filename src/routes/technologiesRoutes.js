const express = require('express');
const router = express.Router();
const technologiesController = require('../controllers/technologiesController');

// GET /list - static list of technologies
router.get('/list', (req, res) => technologiesController.getList(req, res));

module.exports = router;
