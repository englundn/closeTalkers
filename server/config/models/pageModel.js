const request = require('request-promise');
const user = process.env.ELASTIC_USER || require('../config').user;
const pass = process.env.ELASTIC_PASSWORD || require('../config').password;
const checksum = require('checksum');

const URL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200';

const search = (id, qs, cs) => {
  if (cs) {
    return {
      method: 'GET',
      uri: `${URL}/${id}/archive/_search`,
      auth: { user, pass },
      body: {
        query: {
          match: {
            cs,
          },
        },
      },
      json: true,
    };
  }
  return {
    method: 'GET',
    uri: `${URL}/${id}/archive/_search`,
    auth: { user, pass },
    body: {
      query: {
        match: {
          text: qs,
        },
      },
    },
    json: true,
  };
};

const createOptions = (url, title, id, text) => {
  const timestamp = Date.now();
  const cs = checksum(text);
  return {
    method: 'POST',
    uri: `${URL}/${id}/archive`,
    auth: { user, pass },
    body: { url, title, timestamp, text, cs },
    json: true,
  };
};

// ============= CREATE FROM EXTENSION ============
module.exports = {
  create: (url, title, id, text) => {
    // checks if data exists by comparing cs
    request(search(id, null, checksum(text)))
      .then((data) => {
        if (data.hits.total === 0) {
          request(createOptions(url, title, id, text))
            .catch(err => console.error(err));
        }
      })
      .catch(() => console.log('error'));
  },

// =========== SEARCH FROM WEBSITE =============
  search: (qs, id, callback) => {
    request(search(id, qs, null))
      .then(data => callback(data))
      .catch(err => console.error(err));
  },
};
