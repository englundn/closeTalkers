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
  if (results === null || results.length) {
    return (<div className="contentList">
      {results && results.filter(result => result._source.title !== result._source.text)
      .map((result, index) => (
        <Content result={result} index={index} style={index === expanded} key={index} />
    ))}</div>);
  }
  return (<div className="noContent">
    {loading ?
      (<img alt="" src="../img/loading.gif" />) :
      'No Results'}
  </div>);
};

export default ContentList;
