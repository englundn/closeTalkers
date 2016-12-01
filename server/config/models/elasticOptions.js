const getSum = require('checksum');
const URL = process.env.ELASTIC_URL || require('../config').URL;
const user = process.env.ELASTIC_USER || require('../config').user;
const pass = process.env.ELASTIC_PASSWORD || require('../config').password;

const auth = { user, pass };

const searchOptions = (id, queryString, checksum) => {
  let query = {
    multi_match: {
      query: queryString,
      fields: ['text', 'title', 'url'],
    },
  };
  if (checksum) {
    query = { match: { checksum } };
  }

  return {
    auth,
    method: 'GET',
    uri: `${URL}/user_${id}/pages/_search`,
    body: { query },
    json: true,
  };
};

const createOptions = (url, title, id, text, time) => {
  const checksum = getSum(text);
  const timeInfo = [time];
  const totalTime = time[2];

  return {
    auth,
    method: 'POST',
    uri: `${URL}/user_${id}/pages`,
    body: { url, title, text, checksum, timeInfo, totalTime },
    json: true,
  };
};

const updateOptions = (userId, timeInfo, entryId) => {
  const inline = 'ctx._source.timeInfo.add(params.time); ctx._source.totalTime+=params.seconds';
  const lang = 'painless';
  const time = timeInfo;
  const seconds = timeInfo[2];
  const params = { time, seconds };

  return {
    auth,
    method: 'POST',
    uri: `${URL}/user_${userId}/pages/${entryId}/_update`,
    body: { script: { inline, lang, params } },
    json: true,
  };
};

const timeOptions = (id) => {
  const query = { match_all: {} };
  const sort = { totalTime: 'desc' };
  const size = '1000';

  return {
    auth,
    method: 'GET',
    uri: `${URL}/user_${id}/pages/_search`,
    json: true,
    body: { sort, query, size },
  };
};

const deleteOptions = (userId, entryId) => {
  const uri = `${URL}/user_${userId}/pages/${entryId}`;
  return {
    auth,
    uri,
    method: 'DELETE',
    json: true,
  };
};

module.exports = {
  searchOptions,
  createOptions,
  updateOptions,
  timeOptions,
  deleteOptions,
};
