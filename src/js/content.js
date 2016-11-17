import React from 'react';
import timeSince from './timeSince';

const Content = ({ result }) => (
  <div className="content">
    <div className="contentHeader">
      <span className="contentTitle">
        {result._source.title}
      </span>
      <span className="contentTimestamp">
        {timeSince(result._source.timestamp)}
      </span>
      <span className="contentUrl">
        <a href={result._source.url}>{result._source.url}</a>
      </span>
    </div>
    <div className="contentBody">
      {result._source.text.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
);

export default Content;
