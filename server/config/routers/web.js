const express = require('express');
const webController = require('../controllers/web');

const router = new express.Router();

router.route('/search')
  .get(webController.search);

router.route('/checkLogIn')
  .get(webController.checkLogIn);

module.exports = router;
