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
  console.log('loading: ', loading);
  console.log('results: ', results);
  return (loading === false && Array.isArray(results) && results.length === 0) ?
  (<div className="contentList">
    <div className="content">No Results</div>
  </div>) :
  (<div className="contentList">
    {results.filter(result => result._source.title !== result._source.text).map((result, index) => (
      <Content result={result} index={index} style={index === expanded} key={index} />
    ))}
  </div>);
};

export default ContentList;
