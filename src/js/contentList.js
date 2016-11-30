import React from 'react';
import Content from './content';

const filterSetting = 'allTime';
const sortSetting = 'byTimeSpent';

const removeEmpty = result => result._source.title !== result._source.text;

const timeDiff = days => (result) => {
  const ms = days * 86400 * 1000;
  const timeNow = new Date().getTime();
  const timeVisited = result._source.timeInfo[result._source.timeInfo.length - 1][1];
  return (timeNow - timeVisited) < ms;
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
  byTimeSpent: (r1, r2) => r2._source.totalTime - r1._source.totalTime,
  byRelevance: (r1, r2) => r2._score - r1._score,
};

const ContentList = ({ results, expanded, handleExpand, deleteItem }) => (
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
          handleExpand={handleExpand}
          deleteItem={deleteItem}
        />
    ))}
  </div>
);

export default ContentList;
