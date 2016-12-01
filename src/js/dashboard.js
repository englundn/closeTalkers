import React from 'react';
import TimePieGraph from './timePieGraph';
import TimeBarGraph from './timeBarGraph';

const timeDiffChart = days => (entry) => {
  const ms = days * 86400 * 1000;
  const timeNow = new Date().getTime();
  const newEntry = entry;
  let totalTime = 0;
  entry._source.timeInfo.forEach((triplet) => {
    if (timeNow - triplet[1] < ms) {
      totalTime += triplet[2];
    }
  });
  newEntry._source.totalTime = totalTime;
  return newEntry;
};

const filters = {
  Today: timeDiffChart(1),
  'This Week': timeDiffChart(7),
  'This Month': timeDiffChart(30),
  'This Year': timeDiffChart(365),
  'All Time': timeDiffChart(365000),
};

const parseTimeStats = (data) => {
  let timeStats = data.map((entry) => {
    const info = entry._source;
    const matches = info.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    info.domain = matches && matches[1];

    return info;
  });

  const obj = {};
  timeStats.forEach((entry) => {
    const domain = entry.domain;
    obj[domain] = obj[domain] || { domain, entries: [], totalTime: 0 };
    obj[domain].entries.push(entry);
    obj[domain].totalTime += entry.totalTime;
  });

  timeStats = [];
  for (const site of Object.keys(obj)) {
    if (obj[site].totalTime !== 0) {
      timeStats.push(obj[site]);
    }
  }
  timeStats.sort((x, y) => y.totalTime - x.totalTime);
  return timeStats;
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: 'pie',
    };

    this.chooseGraph = this.chooseGraph.bind(this);
  }

  chooseGraph(option) {
    this.setState({ graph: option });
  }

  render() {
    return (
      <div className="dashboard">
        <div className="graphIcons">
          <i className={`material-icons${this.state.graph === 'pie' ? ' highlighted' : ''}`} onClick={() => this.chooseGraph('pie')}>pie_chart</i>
          <i className={`material-icons${this.state.graph === 'bar' ? ' highlighted' : ''}`} onClick={() => this.chooseGraph('bar')}>insert_chart</i>
        </div>
        <div className="graph">
          {(this.state.graph === 'pie') ?
            <TimePieGraph usage={parseTimeStats(this.props.usage.map(filters[this.props.filterSetting]))} />
            : <TimeBarGraph usage={parseTimeStats(this.props.usage.map(filters[this.props.filterSetting]))} />
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
