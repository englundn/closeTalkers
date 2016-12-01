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
