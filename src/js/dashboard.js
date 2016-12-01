import React from 'react';
import TimePieGraph from './timePieGraph';
import TimeBarGraph from './timeBarGraph';
import { chartFilters, parseTimeStats } from './filterHelpers';

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
            <TimePieGraph usage={parseTimeStats(this.props.usage.map(chartFilters[this.props.filterSetting]))} />
            : <TimeBarGraph usage={parseTimeStats(this.props.usage.map(chartFilters[this.props.filterSetting]))} />
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
