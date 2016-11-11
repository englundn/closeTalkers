const express = require('express');

const app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app);

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
