import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const TimeGraph = ({ usage }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + ((outerRadius - innerRadius) * 0.5);
    const x = cx + (2.5 * radius * Math.cos(-midAngle * RADIAN));
    const y = cy + (2.5 * radius * Math.sin(-midAngle * RADIAN));
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${byTime[index].name}`}
      </text>
    );
  };

  let allTime = 0;
  let otherTime = 0;
  const byTime = usage.map((site) => {
    allTime += site.totalTime;
    return { name: site.domain, value: site.totalTime };
  });
  for (let i = 0; i < byTime.length; i += 1) {
    if (byTime[i].value < allTime / 50) {
      otherTime += byTime[i].value;
      byTime.splice(i, 1);
      i -= 1;
    }
  }
  if (otherTime) {
    byTime.push({ name: 'Other', value: otherTime });
  }

  return (
    <PieChart width={800} height={400}>
      <Pie
        data={byTime}
        cx={300}
        cy={200}
        // labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
      >
        {
          byTime.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip />
    </PieChart>
  );

  // return (
  //   <div className="graphs">
  //     <ul>
  //       {usage.map((result, index) => (
  //         <li key={index}>
  //           {index} Domain: {result.domain}
  //           Entries: {result.entries.length}
  //           Time: {result.totalTime}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default TimeGraph;
