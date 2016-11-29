const request = require('request-promise');

const URL = process.env.ELASTIC_URL || require('./config').URL;
const user = process.env.ELASTIC_USER || require('./config').user;
const pass = process.env.ELASTIC_PASSWORD || require('./config').password;

const checkTemplate = (callback) => {
  const options = {
    method: 'HEAD',
    uri: `${URL}/_template/user_template`,
    auth: { user, pass },
    json: true,
  };

  request(options)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
};

module.exports = (callback) => {
  // check if template exists
  checkTemplate((templateExists) => {
    // if template doesn't exist create new template
    if (!templateExists) {
      const template = 'user_*';

      const settings = {
        index: {
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
                filter: [
                  'lowercase',
                  'autocomplete_filter',
                ],
                type: 'custom',
                tokenizer: 'standard',
              },
            },
          },
          number_of_shards: 1,
        },
      };

      const analyzers = {
        type: 'string',
        analyzer: 'autocomplete',
        search_analyzer: 'standard',
      };

      const mappings = {
        pages: {
          properties: {
            url: analyzers,
            title: analyzers,
            text: analyzers,
          },
        },
      };

      const options = {
        method: 'PUT',
        uri: `${URL}/_template/user_template`,
        auth: { user, pass },
        json: true,
        body: { template, settings, mappings },
      };

      request(options)
        .then(() => {
          callback();
        })
        .catch(err => console.error(err.message));
    }
    callback();
  });
};
