const rp = require('request-promise');
const post = require('./postData.js');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Server listening...');
  });

  app.post('/body', (req, res) => {
    const url = req.body.url;
    const title = req.body.title;

    const options = {
      uri: 'http://api.diffbot.com/v3/article',
      qs: {
        token: 'b3d58e155a121116f88ad388847fb6e1',
        url,
      },
      json: true,
    };

    rp(options)
      .then((data) => {
        const text = data.objects[0].text;

        console.log(title);
        console.log(text);

        post(text, title);

        // Post to Elastic Search DB here
      })
      .catch((err) => {
        console.error(err);
      });

    res.end();
  });
};
