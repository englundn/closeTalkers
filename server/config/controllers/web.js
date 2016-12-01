const Page = require('../models/pageModel');

module.exports = {
  search: (req, res) => {
    if (!req.user) { return; }

    Page.search(req.query.q, req.user.id, (data) => {
      res.json(data);
    });
  },

  delete: (req, res) => {
    Page.delete(req.user.id, req.query.id, (data) => {
      res.json(data);
    });
  },

  checkLogIn: (req, res) => {
    res.send(!!req.user && req.user._json.image.url);
  },

  timeStats: (req, res) => {
    Page.timeStats(req.user.id, (data) => {
      res.json(data.hits.hits);
    });
  },
};
