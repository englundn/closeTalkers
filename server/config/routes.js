const chromeRouter = require('./routers/chrome.js');

module.exports = (app) => {
  app.use('/api/chrome', chromeRouter);
};
