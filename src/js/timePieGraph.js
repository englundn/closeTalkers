import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import timeSince from './timeSince';

const TimePieGraph = ({ usage }) => {
  // Set the selection of colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00C49F', '#FFBB28', '#FF8042'];

  // Create "Other" segment for uncommon websites
  let allTime = 0;
  let otherTime = 0;
  const otherArray = [];
  const byTime = usage.map((site) => {
    allTime += site.totalTime;
    return { name: site.domain, value: site.totalTime };
  });
  for (let i = 0; i < byTime.length; i += 1) {
    if (byTime[i].value < allTime / 50) {
      otherTime += byTime[i].value;
      otherArray.push(byTime.splice(i, 1)[0]);
      i -= 1;
    }
  }
  if (otherTime) {
    byTime.push({ name: 'Other', value: otherTime });
  }
  // Generate custom labels
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
  // Generate custom tooltips
  // Based off http://recharts.org/examples/#CustomContentOfTooltip
  class CustomTooltip extends React.Component {
    render() {
      const { active } = this.props;
      if (active) {
        const { payload } = this.props;
        return (
          <div className="custom-tooltip">
            <p className="label">{`${timeSince(payload[0].value)}`}</p>
          </div>
        );
      }
      return null;
    }
  }
  return (
    <PieChart width={600} height={400}>
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
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};

export default TimePieGraph;
