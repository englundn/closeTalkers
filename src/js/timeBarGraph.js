import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const TimeBarGraph = ({ usage }) => {
  // Create "Other" segment for uncommon websites
  // let allTime = 0;
  // let otherTime = 0;
  // const otherArray = [];
  const byTime = usage.map((site) => {
    // allTime += site.totalTime;
    return { name: site.domain, value: site.totalTime };
  });
  // for (let i = 0; i < byTime.length; i += 1) {
  //   if (byTime[i].value < allTime / 50) {
  //     otherTime += byTime[i].value;
  //     otherArray.push(byTime.splice(i, 1)[0]);
  //     i -= 1;
  //   }
  // }
  // if (otherTime) {
  //   byTime.push({ name: 'Other', value: otherTime });
  // }

  return (
    <BarChart
      width={960}
      height={byTime.length * 35}
      data={byTime}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      layout="vertical"
    >
      <YAxis type="category" dataKey="name" width={240} />
      <XAxis type="number" hide={true} />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default TimeBarGraph;
