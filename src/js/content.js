import React from 'react';
import timeSince from './timeSince';

const cleanUrl = (url) => {
  return url
    .replace(/http:\/\/|https:\/\/|\.html|\.pdf|\.php|www\.|\.aspx|\.asp|\/$/gi, '')
    .split('?')[0].split('#')[0].split(':')[0];
};

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
        <a href={result._source.url}>{cleanUrl(result._source.url)}</a>
      </span>
    </div>
    <div className={`contentBody index${index}`}>
      {result._source.text.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
);

export default Content;
