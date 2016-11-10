module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/body', (req, res) => {
    const url = req.body.url;
    const title = req.body.title;
    const body = req.body.body;

    console.log('url', url);
    console.log('title', title);
    console.log('body', body);

    res.end();
  });
};
