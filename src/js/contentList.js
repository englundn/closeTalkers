import React from 'react';
import Content from './content';

const ContentList = ({ results, expanded, handleExpand, deleteItem }) => (
  <div className="contentList">
    {results.filter(result => result._source.title !== result._source.text).map((result, index) => (
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
