import React from 'react';

const Content = ({ result }) => (
  <div className="content">
    <div className="contentHeader">
      <span className="contentTitle">{result._source.title}</span>
      <span className="contentTimestamp">{new Date(result._source.timestamp).toDateString()}</span>
      <span className="contentUrl"><a href={result._source.url}>{result._source.url}</a></span>
    </div>
    <div className="contentBody">
      {result._source.text.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
);

export default Content;
