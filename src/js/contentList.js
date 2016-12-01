import React from 'react';
import Content from './content';

const ContentList = ({ results, expanded, handleExpand, deleteItem, resultOrder, orderSetting, removeEmpty, filters, filterSetting, sorts, sortSetting }) => (
  <div className="contentList">
    {resultOrder[orderSetting](
      results.filter(removeEmpty)
      .filter(filters[filterSetting])
      .sort(sorts[sortSetting])
      ).map((result, index) => (
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
