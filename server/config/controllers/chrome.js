const Page = require('../models/pageModel');
const extractor = require('unfluff');

module.exports = {
  update: (req, res) => {
    const url = req.body.url;
    const userId = req.body.userId;
    const timeInfo = req.body.timeInfo;
    const title = req.body.title;
    const text = extractor(req.body.body, 'en').text || title;

    Page.update(url, userId, text, title, timeInfo);
    res.end();
  },
};
