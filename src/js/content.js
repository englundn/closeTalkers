import React from 'react';
import timeSince from './timeSince';

const cleanUrl = url => (
  url
    .replace(/http:\/\/|https:\/\/|\.html|\.pdf|\.php|www\.|\.aspx|\.asp|\/$/gi, '')
    .split('?')[0].split('#')[0].split(':')[0]
);

const Content = ({ result, index, style, handleExpand, deleteItem }) => (
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
    </div>
    <div className="contentFooter">
      {!style ? <div className="contentFooterLeft" onClick={() => handleExpand(index)}>
        <i className="material-icons">expand_more</i><span>Show more</span>
      </div>
      : <div className="contentFooterLeft" onClick={() => handleExpand(-1)}>
        <i className="material-icons">expand_less</i><span>Show less</span>
      </div>}
      {style && <div className="contentFooterRight">
        <i className="material-icons" onClick={() => deleteItem(result._id)}>delete</i>
      </div>}
    </div>
  </div>
);

export default Content;
