const request = require('request-promise');
const getSum = require('checksum');

const user = process.env.ELASTIC_USER || require('../config').user;
const pass = process.env.ELASTIC_PASSWORD || require('../config').password;

const URL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200';

const search = (id, queryString, checksum) => {
  let query = {
    match: {
      text: queryString,
    },
  };
  if (checksum) {
    query = {
      match: {
        checksum,
      },
    };
  }

  return {
    method: 'GET',
    uri: `${URL}/${id}/archive/_search`,
    auth: { user, pass },
    body: { query },
    json: true,
  };
};

const createOptions = (url, title, id, text) => {
  const timestamp = Date.now();
  const checksum = getSum(text);
  return {
    method: 'POST',
    uri: `${URL}/${id}/archive`,
    auth: { user, pass },
    body: { url, title, timestamp, text, checksum },
    json: true,
  };
};

module.exports = {
  // ============= CREATE FROM EXTENSION ============
  create: (url, title, id, text) => {
    // checks if data exists by comparing checksum
    request(search(id, null, getSum(text)))
      .then((data) => {
        if (!data || data.hits.total === 0) {
          request(createOptions(url, title, id, text))
            .catch(err => console.error(err));
        }
      })
      .catch(() => {
        request(createOptions(url, title, id, text))
          .catch(err => console.error(err));
      });
  },

  // =========== SEARCH FROM WEBSITE =============
  search: (queryString, id, callback) => {
    request(search(id, queryString, null))
      .then(data => callback(data))
      .catch(err => console.error(err));
  },
};
