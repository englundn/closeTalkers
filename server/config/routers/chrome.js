const express = require('express');
const chromeController = require('../controllers/chrome');

const router = new express.Router();

router.route('/')
  .post(chromeController.update);

module.exports = router;
