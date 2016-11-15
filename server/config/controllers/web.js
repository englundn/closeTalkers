const Page = require('../models/pageModel');

module.exports = {
  search: (req, res) => {
    const qs = req.query.q;

    Page.search(qs, (data) => {
      res.json(data);
    });
  },
};
