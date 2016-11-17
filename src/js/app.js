import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import LandingPage from './landingPage';
import Header from './header';
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
      isLoggedIn: 'loading',
    };
    this.query = this.query.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Checks to see if the user is logged in
  componentDidMount() {
    $.ajax({
      url: `${URL}/api/web/checkLogIn`,
      method: 'GET',
      success: (isLoggedIn) => {
        this.setState({ isLoggedIn });
      },
    });
  }

  componentDidUpdate() {
    // Make search terms bold in search results
    const regExpQuery = RegExp((this.state.query.match(/\S+/gi) || []).join('|'), 'gi');
    // console.log('query: ', regExpQuery);
    const html = $('p').html();
    if (html && `${regExpQuery}` !== '/(?:)/gi') {
      // console.log('yes1');
      $('p').each((index, element) => {
        // console.log(element);
        const context = $(element).text();
        $(element).html(context.replace(regExpQuery, '<strong>$&</strong>'));
      });
    }
  }

  // Queries the server for search results
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
    if (this.state.isLoggedIn === false) {
      return (
        <LandingPage />
      );
    }
    if (this.state.isLoggedIn === true) {
      return (
        <div>
          <Header
            query={this.state.query}
            handleChange={this.handleChange}
          />
          <ContentList
            results={this.state.results}
          />
        </div>
      );
    }
    return (
      <div />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

