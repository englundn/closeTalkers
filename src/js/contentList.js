import React from 'react';
import Content from './content';

<<<<<<< HEAD
const filterSetting = 'allTime';
const sortSetting = 'byTimeSpent';

const removeEmpty = result => result._source.title !== result._source.text;

const timeDiff = days => (result) => {
  const ms = days * 86400 * 1000;
  const timeNow = new Date().getTime();
  const timeVisited = result._source.timeInfo[result._source.timeInfo.length - 1][1];
  return (timeNow - timeVisited) < ms;
};

const timeSpent = (result) => {
  let total = 0;
  result._source.timeInfo.forEach((triplet) => { total += triplet[2]; });
  return total;
};

const filters = {
  today: timeDiff(1),
  thisWeek: timeDiff(7),
  thisMonth: timeDiff(30),
  thisYear: timeDiff(365),
  allTime: data => data,
};

const sorts = {
  byVisits: (r1, r2) => r2._source.timeInfo.length - r1._source.timeInfo.length,
  byTimeSpent: (r1, r2) => timeSpent(r2) - timeSpent(r1),
  byRelevance: (r1, r2) => r2._score - r1._score,
};

const ContentList = ({ results, expanded, deleteItem }) => (
  <div className="contentList">
    {results.filter(removeEmpty)
      .filter(filters[filterSetting])
      .sort(sorts[sortSetting])
      .map((result, index) => (
        <Content
          result={result}
          index={index}
          style={index === expanded}
          key={index}
          deleteItem={deleteItem}
        />
    ))}
  </div>
);

export default ContentList;
