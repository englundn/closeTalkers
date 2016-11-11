const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app, express) => {
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(express.static(path.join(__dirname, '/../../dist/')));
  app.set('views', path.join(__dirname, '../../dist/view'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
};
