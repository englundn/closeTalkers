import React from 'react';
import timeSince from './timeSince';

const cleanUrl = (url) => {
  return url
    .replace(/http:\/\/|https:\/\/|\.html|\.pdf|\.php|www\.|\.aspx|\.asp|\/$/gi, '')
    .split('?')[0].split('#')[0].split(':')[0];
};

const Content = ({ result, index, style }) => (
  <div className={`content ${index}${style ? ' expanded' : ''}`}>
    <div className="contentHeader">
      <span className="contentTitle">
        {result._source.title}
      </span>
      <span className="contentTimestamp">
        {timeSince(result._source.timeInfo[result._source.timeInfo.length - 1][1])}
      </span>
      <span className="contentUrl">
        <a href={result._source.url}>{cleanUrl(result._source.url)}</a>
      </span>
    </div>
    <div className={`contentBody ${index}${style ? ' expanded' : ''}`}>
      {result._source.text.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
);

export default Content;
