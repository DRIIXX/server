const express = require('express');
const router = express.Router();
const technologiesController = require('../controllers/technologiesController');

// GET /list - static list of technologies
router.get('/list', (req, res) => technologiesController.getList(req, res));

// GET /search - search technologies by name
router.get('/search', (req, res) => technologiesController.search(req, res));

// GET /details/:id - technology details or 404
router.get('/details/:id', (req, res) => technologiesController.getDetails(req, res));

// POST /admin/add - add new technology
router.post('/admin/add', (req, res) => technologiesController.create(req, res));

// PUT /admin/edit/:id - update technology
router.put('/admin/edit/:id', (req, res) => technologiesController.update(req, res));

// DELETE /admin/delete/:id - delete technology
router.delete('/admin/delete/:id', (req, res) => technologiesController.delete(req, res));

module.exports = router;
