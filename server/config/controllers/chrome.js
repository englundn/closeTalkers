const rp = require('request-promise');
const token = require('../config.js').token;
const Page = require('../models/pageModel');

module.exports = {
  newPage: (req, res) => {
    const url = req.body.url;
    const title = req.body.title;

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

          Page.create(title, text);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    res.end();
  },
};
