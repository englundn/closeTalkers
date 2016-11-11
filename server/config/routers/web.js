const express = require('express');
const webController = require('../controllers/web');

const router = new express.Router();

router.route('/search')
  .get(webController.search);

module.exports = router;
