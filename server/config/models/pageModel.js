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
    uri: `${URL}/archive/${id}/_search`,
    auth: { user, pass },
    body: { query },
    json: true,
  };
};

const createOptions = (url, title, id, text, time) => {
  const checksum = getSum(text);
  const timeInfo = [];
  timeInfo.push(time);
  return {
    method: 'POST',
    uri: `${URL}/archive/${id}`,
    auth: { user, pass },
    body: { url, title, text, checksum, timeInfo },
    json: true,
  };
};

const update = (userId, timeInfo, entryId) => {
  return {
    method: 'POST',
    uri: `${URL}/archive/${userId}/${entryId}/_update`,
    auth: { user, pass },
    json: true,
    body: {
      script: {
        inline: 'ctx._source.timeInfo.add(params.time)',
        lang: 'painless',
        params: {
          time: timeInfo,
        },
      },
    },
  };
};

module.exports = {
  // =========== SEARCH FROM WEBSITE =============
  search: (queryString, id, callback) => {
    request(search(id, queryString, null))
      .then(data => callback(data))
      .catch(err => console.error(err));
  },

  // Page.update(url, userId, text, title, timeInfo);
  update: (url, id, text, title, timeInfo) => {
    request(search(id, null, getSum(text)))
      .then((data) => {
        if (data && data.hits.total === 1) {
          console.log(data.hits.hits[0]._id);
          request(update(id, timeInfo, data.hits.hits[0]._id))
            .catch(err => console.error(err));
        } else if (!data || data.hits.total === 0) {
          request(createOptions(url, title, id, text, timeInfo))
            .catch(err => console.error(err));
        }
      })
      .catch(() => {
        request(createOptions(url, title, id, text, timeInfo))
          .catch(err => console.error(err));
      });
  },
};

// PUT /archive
const edgeNgram = {
  settings: {
    number_of_shards: 1,
    analysis: {
      filter: {
        autocomplete_filter: {
          type: 'edge_ngram',
          min_gram: 1,
          max_gram: 20,
        },
      },
      analyzer: {
        autocomplete: {
          type: 'custom',
          tokenizer: 'standard',
          filter: [
            'lowercase',
            'autocomplete_filter',
          ],
        },
      },
    },
  },
};
