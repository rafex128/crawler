const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/mercadolivre/search', controllers.search);

module.exports = router;