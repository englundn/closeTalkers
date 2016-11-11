const rp = require('request-promise');
const ES = require('./config.js');

const URL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200/test/test/AVhQ8_qA6vD3_5aG54Q7';

module.exports = (req, res) => {
  const options = {
    method: 'GET',
    uri: URL,
    auth: {
      user: ES.user,
      pass: ES.password,
    },
    json: true,
  };

  rp(options)
    .then((body) => {
      res.json(body);
    });
};
