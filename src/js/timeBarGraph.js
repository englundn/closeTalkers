import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const TimeBarGraph = ({ usage }) => {
  const byTime = usage.map((site) => {
    return { name: site.domain, value: site.totalTime };
  });
  
  return (
    <BarChart
      width={960}
      height={byTime.length * 27}
      data={byTime}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      layout="vertical"
    >
      <YAxis type="category" dataKey="name" width={240} />
      <XAxis type="number" hide={true} />
      <Bar dataKey="value" fill="#72C2AE" />
    </BarChart>
  );
};

export default TimeBarGraph;
