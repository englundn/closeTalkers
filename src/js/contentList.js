import React from 'react';
import Content from './content';

const ContentList = ({ results, expanded, deleteItem }) => (
  <div className="contentList">
    {results.filter(result => result._source.title !== result._source.text).map((result, index) => (
      <Content
        result={result}
        index={index}
        style={index === expanded}
        deleteItem={deleteItem}
      />
    ))}
  </div>
);

export default ContentList;
