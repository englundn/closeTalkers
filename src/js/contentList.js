import React from 'react';
import Content from './content';

// const ContentList = ({ results, expanded }) => (
//   <div className="contentList">
//     {results.filter(result => result._source.title !== result._source.text).map((result, index) => (
//       <Content result={result} index={index} style={index === expanded} key={index} />
//     ))}
//   </div>
// );

const ContentList = ({ results, expanded, loading }) => {
  return (loading === false && Array.isArray(results) && results.length === 0) ?
  (<div className="noContent">No Results</div>) :
  (<div className="contentList">
    {results && results.filter(result => result._source.title !== result._source.text).map((result, index) => (
      <Content result={result} index={index} style={index === expanded} key={index} />
    ))}
  </div>);
};

export default ContentList;
