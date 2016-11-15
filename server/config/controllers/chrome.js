const rp = require('request-promise');
const Page = require('../models/pageModel');

const token = process.env.DIFFBOT_TOKEN || require('../config').token;

module.exports = {
  newPage: (req, res) => {
    const url = req.body.url;
    const title = req.body.title;
    const userId = req.body.userId;

    const options = {
      uri: 'http://api.diffbot.com/v3/article',
      qs: {
        token,
        url,
      },
      json: true,
    };

    rp(options)
      .then((data) => {
        if (data.objects) {
          const text = data.objects[0].text;

          Page.create(url, title, userId, text);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    res.end();
  },
};
