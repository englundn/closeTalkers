export function removeEmpty(result) {
  return result._source.title !== result._source.text;
}

const timeDiff = days => (result) => {
  const ms = days * 86400 * 1000;
  const timeNow = new Date().getTime();
  const timeVisited = result._source.timeInfo[result._source.timeInfo.length - 1][1];
  return (timeNow - timeVisited) < ms;
};

export const filters = {
  Today: timeDiff(1),
  'This Week': timeDiff(7),
  'This Month': timeDiff(30),
  'This Year': timeDiff(365),
  'All Time': data => data,
};

export const sorts = {
  Relevance: (r1, r2) => r2._score - r1._score,
  'Last Visited': (r1, r2) => r2._source.timeInfo[r2._source.timeInfo.length - 1][1] -
                              r1._source.timeInfo[r1._source.timeInfo.length - 1][1],
  'Time Spent': (r1, r2) => r2._source.totalTime - r1._source.totalTime,
  Visits: (r1, r2) => r2._source.timeInfo.length - r1._source.timeInfo.length,
};

export const resultOrder = {
  Descending: array => array,
  Ascending: array => array.reverse(),
};

const timeDiffChart = days => (entry) => {
  const ms = days * 86400 * 1000;
  const timeNow = new Date().getTime();
  const newEntry = entry;
  let totalTime = 0;
  entry._source.timeInfo.forEach((triplet) => {
    if (timeNow - triplet[1] < ms) {
      totalTime += triplet[2];
    }
  });
  newEntry._source.totalTime = totalTime;
  return newEntry;
};

export const chartFilters = {
  Today: timeDiffChart(1),
  'This Week': timeDiffChart(7),
  'This Month': timeDiffChart(30),
  'This Year': timeDiffChart(365),
  'All Time': timeDiffChart(365000),
};

export function parseTimeStats(data) {
  let timeStats = data.map((entry) => {
    const info = entry._source;
    const matches = info.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    info.domain = matches && matches[1];

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
    if (obj[site].totalTime !== 0) {
      timeStats.push(obj[site]);
    }
  }
  timeStats.sort((x, y) => y.totalTime - x.totalTime);
  return timeStats;
}
