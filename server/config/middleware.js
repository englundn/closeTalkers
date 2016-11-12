const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app, express) => {
  app.use((req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('access-control-allow-headers', 'content-type, accept');
    res.header('access-control-max-age', 10);
    next();
  });
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(express.static(path.join(__dirname, '/../../dist/')));
  app.set('views', path.join(__dirname, '../../dist/view'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
};
