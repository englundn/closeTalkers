const express = require('express');
const webController = require('../controllers/web');

const router = new express.Router();

router.route('/search')
  .get(webController.search);

router.route('/delete')
  .delete(webController.delete);

router.route('/checkLogIn')
  .get(webController.checkLogIn);

router.route('/timeStats')
  .get(webController.timeStats);

module.exports = router;
