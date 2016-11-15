const Page = require('../models/pageModel');

module.exports = {
  search: (req, res) => {
    const qs = req.query.q;

    console.log('qs', qs);

    Page.search(qs, (data) => {
      res.json(data);
    });
  },
};
