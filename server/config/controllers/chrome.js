const request = require('request-promise');
const Page = require('../models/pageModel');

const token = process.env.DIFFBOT_TOKEN || require('../config').token;

const options = (url) => {
  return {
    uri: 'http://api.diffbot.com/v3/article',
    qs: { token, url },
    json: true,
  };
};

module.exports = {
  update: (req, res) => {
    const url = req.body.url;
    const userId = req.body.userId;
    const timeInfo = req.body.timeInfo;

    request(options(url))
      .then((data) => {
        if (data.objects) {
          const text = data.objects[0].text;
          const title = data.objects[0].title;
          if (text.length > 0) {
            Page.update(url, userId, text, title, timeInfo);
          }
        }
      })
      .catch(err => console.error(err));

    res.end();
  },
};
