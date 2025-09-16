const express = require('express');
const router = express.Router();

const technologiesRoutes = require('./technologiesRoutes');

// Mount technologies routes at /technologies
router.use('/technologies', technologiesRoutes);

module.exports = router;
