const Page = require('../models/pageModel');
const extractor = require('unfluff');

const debounce = (func, wait, immediate) => {
  let timeout = null;
  return (...args) => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !(timeout === null);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

const update = debounce(Page.update, 500);

module.exports = {
  update: (req, res) => {
    const url = req.body.url;
    const userId = req.body.userId;
    const timeInfo = req.body.timeInfo;
    const title = req.body.title;
    const text = extractor(req.body.body, 'en').text || title;

    update(url, userId, text, title, timeInfo);

    res.end();
  },
};
