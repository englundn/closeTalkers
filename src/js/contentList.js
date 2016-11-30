import React from 'react';
import Filters from './filters';
import Content from './content';

const removeEmpty = result => result._source.title !== result._source.text;

const timeDiff = days => (result) => {
  const ms = days * 86400 * 1000;
  const timeNow = new Date().getTime();
  const timeVisited = result._source.timeInfo[result._source.timeInfo.length - 1][1];
  return (timeNow - timeVisited) < ms;
};

const filters = {
  Today: timeDiff(1),
  'This Week': timeDiff(7),
  'This Month': timeDiff(30),
  'This Year': timeDiff(365),
  'All Time': data => data,
};

const sorts = {
  Visits: (r1, r2) => r2._source.timeInfo.length - r1._source.timeInfo.length,
  'Time Spent': (r1, r2) => r2._source.totalTime - r1._source.totalTime,
  Relevance: (r1, r2) => r2._score - r1._score,
};

class ContentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSetting: 'All Time',
      sortSetting: 'Time Spent',
    };

    this.setFilter = this.setFilter.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  setFilter(option) {
    this.setState({ filterSetting: option });
  }

  setSort(option) {
    this.setState({ sortSetting: option });
  }

  render() {
    return (
      <div className="contentList">
        <Filters
          filters={Object.keys(filters)}
          filterSetting={this.state.filterSetting}
          setFilter={this.setFilter}
          sorts={Object.keys(sorts)}
          sortSetting={this.state.sortSetting}
          setSort={this.setSort}
        />
        {this.props.results.filter(removeEmpty)
          .filter(filters[this.state.filterSetting])
          .sort(sorts[this.state.sortSetting])
          .map((result, index) => (
            <Content
              result={result}
              index={index}
              style={index === this.props.expanded}
              key={index}
              handleExpand={this.props.handleExpand}
              deleteItem={this.props.deleteItem}
            />
        ))}
      </div>
    );
  }
}

export default ContentList;
