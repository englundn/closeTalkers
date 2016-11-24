const request = require('request-promise');
const getSum = require('checksum');

const user = process.env.ELASTIC_USER || require('../config').user;
const pass = process.env.ELASTIC_PASSWORD || require('../config').password;

const URL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200';

const searchOptions = (id, queryString, checksum) => {
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
    uri: `${URL}/user_${id}/pages/_search`,
    auth: { user, pass },
    body: { query },
    json: true,
  };
};

const createOptions = (url, title, id, text, time) => {
  const checksum = getSum(text);
  const timeInfo = [time];

  return {
    method: 'POST',
    uri: `${URL}/user_${id}/pages`,
    auth: { user, pass },
    body: { url, title, text, checksum, timeInfo },
    json: true,
  };
};

const updateOptions = (userId, timeInfo, entryId) => {
  return {
    method: 'POST',
    uri: `${URL}/user_${userId}/pages/${entryId}/_update`,
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

const deleteOptions = (userId, entryId) => {
  return {
    method: 'DELETE',
    uri: `${URL}/user_${userId}/pages/${entryId}`,
    auth: { user, pass },
    json: true,
  };
};


module.exports = {
  // =========== SEARCH FROM WEBSITE =============
  search: (queryString, id, callback) => {
    request(searchOptions(id, queryString, null))
      .then(data => callback(data))
      .catch(err => console.error(err.message));
  },

  // ===========DELETE FROM DATABASE =============
  delete: (userId, entryId, callback) => {
    request(deleteOptions(userId, entryId))
      .then(data => callback(data))
      .catch(err => console.error(err.message));
  },

  // ========== UPDATE OR CREATE PAGE ============
  update: (url, id, text, title, timeInfo) => {
    // checks if article already exists
    request(searchOptions(id, null, getSum(text)))
      .then((data) => {
        // if article exists just update time
        if (data && data.hits.total === 1) {
          request(updateOptions(id, timeInfo, data.hits.hits[0]._id))
            .catch(err => console.error(err.message));
        // if article doesn't exist create article
        } else if (!data || data.hits.total === 0) {
          request(createOptions(url, title, id, text, timeInfo))
            .catch(err => console.error(err.message));
        }
      })
      .catch(() => {
        // if request is unsuccessful create article
        request(createOptions(url, title, id, text, timeInfo))
          .catch(err => console.error(err.message));
      });
  },
};
