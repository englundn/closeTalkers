const request = require('request-promise');

const user = process.env.ELASTIC_USER || require('./config').user;
const pass = process.env.ELASTIC_PASSWORD || require('./config').password;

const URL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200';

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
      // PUT _template/user_template
      // {
      //     "template" : "user_*",
      //     "settings" : {
      //         "number_of_shards" : 1
      //     },
      // }

      // const edgeNgram = {
      //   settings: {
      //     number_of_shards: 1,
      //     analysis: {
      //       filter: {
      //         autocomplete_filter: {
      //           type: 'edge_ngram',
      //           min_gram: 1,
      //           max_gram: 20,
      //         },
      //       },
      //       analyzer: {
      //         autocomplete: {
      //           type: 'custom',
      //           tokenizer: 'standard',
      //           filter: [
      //             'lowercase',
      //             'autocomplete_filter',
      //           ],
      //         },
      //       },
      //     },
      //   },
      // };
    }
    callback();
  });
};
