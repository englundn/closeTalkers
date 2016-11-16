const Page = require('../models/pageModel');

module.exports = {
  search: (req, res) => {
    if (!req.user) { return; }

    Page.search(req.query.q, req.user.id, (data) => {
      res.json(data);
    });
  },
  checkLogIn: (req, res) => res.send(!!req.user),
};
