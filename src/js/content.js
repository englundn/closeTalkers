import React from 'react';
import timeSince from './timeSince';

const cleanUrl = url => (
  url
    .replace(/http:\/\/|https:\/\/|\.html|\.pdf|\.php|www\.|\.aspx|\.asp|\/$/gi, '')
    .split('?')[0].split('#')[0].split(':')[0]
);

const Content = ({ result, index, style, deleteItem }) => (
  <div className="contentWrapper">
    <div className="content">
      <div className="contentHeaderWrapper">
        <div className="contentHeader">
          <div className="contentHeaderTop">
            <span className="contentTitle">
              {result._source.title}
            </span>
            <span className="contentTimestamp">
              {timeSince(new Date().getTime()
                - result._source.timeInfo[result._source.timeInfo.length - 1][1])} ago
            </span>
          </div>
          <div className="contentHeaderBottom">
            <span className="contentUrl">
              <a href={result._source.url} target="_blank">{cleanUrl(result._source.url)}</a>
            </span>
            <span className="viewedTimestamp">
              viewed for {timeSince(result._source.timeInfo.reduce((prev, next) =>
                prev + next[2], 0), true)}
            </span>
          </div>
        </div>
      </div>
      <div className="contentBodyWrapper">
        <div className={`contentBody ${index} ${style ? 'expanded' : ''}`}>
          {result._source.text.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
      {style && <div className="contentFooterWrapper">
        <div className="contentFooter">
          <span onClick={() => deleteItem(result._id)}>delete</span>
        </div>
      </div>}
    </div>
  </div>
);

export default Content;
