import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from './header';
import LandingPage from './landingPage';
import ContentList from './contentList';
import '../css/style.scss';

const URL = 'https://dejavu.ninja';
// const URL = 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: null,
      isLoggedIn: 'loading',
      expanded: -1,
      loading: false,
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
    $('.contentBody').each((index, element) => {
      $(element).unbind().click(() => {
        this.setState({ expanded: this.state.expanded === index ? -1 : index });
      });
    });

    const regExpQuery = RegExp((this.state.query.match(/\S+/gi) || []).join('|'), 'gi');
    const html = $('p').html();
    if (html && `${regExpQuery}` !== '/(?:)/gi') {
      $('p').each((index, element) => {
        const context = $(element).text();
        $(element).html(context.replace(regExpQuery, '<span class="highlight">$&</span>'));
      });
    }
  }

  // Queries the server for search results
  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });

    if (query.length >= 2) {
      this.setState({ loading: true });
      this.query(query);
    } else {
      this.setState({ results: null });
    }
  }

  query(qs) {
    $.ajax({
      url: `${URL}/api/web/search?q="${qs}"`,
      method: 'GET',
      success: (data) => {
        this.setState({ results: data.hits.hits, loading: false });
      },
    });
  }

  render() {
    return (
      <div>
        <Header
          query={this.state.query}
          handleChange={this.handleChange}
          isLoggedIn={this.state.isLoggedIn}
          loading={this.state.loading}
        />
        {this.state.isLoggedIn === false &&
          <LandingPage />
        }
        {this.state.isLoggedIn === true &&
          <ContentList
            results={this.state.results}
            expanded={this.state.expanded}
            loading={this.state.loading}
          />
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
