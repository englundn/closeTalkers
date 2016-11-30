import React from 'react';
import TimePieGraph from './timePieGraph';
import TimeBarGraph from './timeBarGraph';

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
        <div className="graph">
          <TimePieGraph usage={this.props.usage} />
        </div>
        <div className="graph">
          <TimeBarGraph usage={this.props.usage} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
