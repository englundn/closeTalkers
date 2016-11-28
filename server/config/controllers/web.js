const Page = require('../models/pageModel');

const parseTimeStats = (data) => {
  let timeStats = data.hits.hits.map((entry) => {
    const info = entry._source;
    const matches = info.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    info.domain = matches && matches[1];

    let totalTime = 0;
    info.timeInfo.forEach((time) => {
      totalTime += time[2];
    });
    info.totalTime = totalTime;


    return info;
  });

  const obj = {};
  timeStats.forEach((entry) => {
    const domain = entry.domain;
    obj[domain] = obj[domain] || { domain, entries: [], totalTime: 0 };
    obj[domain].entries.push(entry);
    obj[domain].totalTime += entry.totalTime;
  });

  timeStats = [];
  for (const site of Object.keys(obj)) {
    timeStats.push(obj[site]);
  }
  timeStats.sort((x, y) => y.totalTime - x.totalTime);
  return timeStats;
};

module.exports = {
  search: (req, res) => {
    if (!req.user) { return; }

    Page.search(req.query.q, req.user.id, (data) => {
      res.json(data);
    });
  },

  checkLogIn: (req, res) => res.send(!!req.user),

  timeStats: (req, res) => {
    Page.timeStats(req.user.id, (data) => {
      res.json(parseTimeStats(data));
    });
  },
};
