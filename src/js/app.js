import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from './header';
import ContentList from './contentList';
import '../css/style.scss';

// const URL = 'https://deja-vu.herokuapp.com';
const URL = 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      isLoggedIn: false,
    };
    this.query = this.query.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `${URL}/api/web/checkLogIn`,
      method: 'GET',
      success: (isLoggedIn) => {
        console.log(isLoggedIn);
        this.setState({ isLoggedIn });
      },
    });
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
    return this.state.isLoggedIn ? (
      <div>
        <a href="/logout">Logout</a>
        <Header
          query={this.query}
          queryString={this.state.query}
          handleChange={this.handleChange}
        />
        <ContentList
          results={this.state.results}
        />
      </div>
    ) : (
      <div>
        <a href="/login">Login</a>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
