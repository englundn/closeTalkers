import React from 'react';

const Content = ({ result }) => (
  <div className="content">
    <div className="contentHeader">
      <p>{result._source.title}</p>
    </div>
    <div className="contentBody">
      {result._source.text.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
);

export default Content;
