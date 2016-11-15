import React from 'react';

const Content = ({ result }) => (
  <div className="content">
    <div className="contentWrapper">
      <h4>{result._source.title}</h4>
      {result._source.text.split('\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </div>
);

export default Content;
