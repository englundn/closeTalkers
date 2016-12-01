const request = require('request-promise');
const getSum = require('checksum');
const { searchOptions, deleteOptions, updateOptions, createOptions, timeOptions } = require('./elasticOptions');

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
  update: (url, id, text, title, timeInfo, callback) => {
    // checks if article already exists
    request(searchOptions(id, null, getSum(text)))
      .then((data) => {
        if (callback) {
          callback(data);
        }
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
          .then((data) => {
            if (callback) {
              callback(data);
            }
          })
          .catch(err => console.error(err.message));
      });
  },

  // ============== GET TIME STATS =================
  timeStats: (id, callback) => {
    request(timeOptions(id))
      .then(data => callback(data))
      .catch(err => console.error(err.message));
  },
};
