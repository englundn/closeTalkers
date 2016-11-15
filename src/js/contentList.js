import React from 'react';
import Content from './content';

const ContentList = ({ results }) => (
  <div className="contentList">
    {results.map((result, i) => (
      <Content result={result} key={i} />
    ))}
  </div>
);

export default ContentList;
