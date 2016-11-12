const chromeRouter = require('./routers/chrome.js');
const webRouter = require('./routers/web.js');

module.exports = (app) => {
  app.use('/api/chrome', chromeRouter);
  app.use('/api/web', webRouter);
};
