import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ContentList from './contentList';
import '../css/style.scss';

const URL = 'https://deja-vu.herokuapp.com';
// const URL = 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    };
    this.query = this.query.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });

    if (query.length >= 2) {
      this.query(query);
    } else {
      this.setState({ results: [] });
    }
  }

  query(qs) {
    $.ajax({
      url: `${URL}/api/web/search?q="${qs}"`,
      method: 'GET',
      success: (data) => {
        this.setState({ results: data.hits.hits });
      },
    });
  }

  render() {
    return (
      <div>
        <form className="inputForm" onSubmit={this.query}>
          <input
            className="inputField" type="text"
            placeholder="Search"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
        <ContentList results={this.state.results} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
