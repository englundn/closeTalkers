import React from 'react';
import timeSince from './timeSince';

const cleanUrl = (url) => {
  const clean = url.replace(/http:\/\/|https:\/\//, '').replace(/www./, '').split('?')[0].split('#')[0].split('.');
  if (clean) {
    return clean.slice(0,clean.length - 1).join('.');
  }
  return '';
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
    <div className="contentBody">
      {result._source.text.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
);

export default Content;
