import React from 'react';
import Content from './content';

const ContentList = ({ results, expanded }) => (
  <div className="contentList">
    {results.map((result, index) => (
      <Content result={result} style={index === expanded} key={index} />
    ))}
  </div>
);

export default ContentList;
