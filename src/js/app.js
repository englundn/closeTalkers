import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from './header';
import LandingPage from './landingPage';
import Dashboard from './dashboard';
import ContentList from './contentList';
import Modal from './modal';
import '../css/style.scss';

// const URL = 'https://dejavu.ninja';
const URL = 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      isLoggedIn: 'loading',
      expanded: -1,
      loading: false,
      usage: [],
      dashboard: false,
      modal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.query = this.query.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // Checks to see if the user is logged in
  componentDidMount() {
    $.ajax({
      url: `${URL}/api/web/checkLogIn`,
      method: 'GET',
      success: (isLoggedIn) => {
        this.setState({ isLoggedIn });
        if (isLoggedIn) {
          this.getUsageData();
        }
      },
    });
  }

  componentDidUpdate() {
    const regExpQuery = RegExp((this.state.query.match(/\S+/gi) || []).join('|'), 'gi');
    const html = $('p').html();
    if (html && `${regExpQuery}` !== '/(?:)/gi') {
      $('p').each((index, element) => {
        const context = $(element).text();
        $(element).html(context.replace(regExpQuery, '<span class="highlight">$&</span>'));
      });
    }
  }

  getUsageData() {
    $.ajax({
      url: `${URL}/api/web/timeStats`,
      method: 'GET',
      success: (usage) => {
        this.setState({ usage });
      },
    });
  }

  query(qs) {
    this.setState({ loading: true });

    $.ajax({
      url: `${URL}/api/web/search?q="${qs}"`,
      method: 'GET',
      success: (data) => {
        this.setState({ results: data.hits.hits, loading: false });
      },
    });
  }

  handleExpand(index) {
    this.setState({ expanded: index });
  }

  deleteItem(id) {
    const context = this;
    $.ajax({
      url: `${URL}/api/web/delete?id=${id}`,
      method: 'DELETE',
    })
    .done(() => {
      context.setState({ expanded: -1 });
      context.query(context.state.query);
    })
    .fail(() => {
      console.log('failed to delete in app.js');
    });
  }

  // Queries the server for search results
  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });

    if (query.length > 1) {
      this.query(query);
    } else {
      this.setState({ results: [] });
    }
  }

  toggleModal() {
    const modal = document.getElementById('myModal');
    const t1 = document.getElementById('t1');
    const t2 = document.getElementById('t2');
    this.setState({ modal: !this.state.modal }, () => {
      t1.style.display = this.state.modal ? 'block' : 'none';
      t2.style.display = this.state.modal ? 'block' : 'none';
      modal.style.display = this.state.modal ? 'block' : 'none';
    });
  }

  render() {
    return (
      <div className="appWrapper">
        <Header
          query={this.state.query}
          handleChange={this.handleChange}
          isLoggedIn={this.state.isLoggedIn}
          toggleModal={this.toggleModal}
        />
        {!this.state.isLoggedIn &&
          <LandingPage />
        }
        {this.state.isLoggedIn && this.state.isLoggedIn !== 'loading' && !this.state.loading &&
          (!this.state.dashboard ?
            ((this.state.query.length < 2 || this.state.results.length) ?
              <ContentList
                results={this.state.results}
                expanded={this.state.expanded}
                handleExpand={this.handleExpand}
                deleteItem={this.deleteItem}
              />
            : <div className="noContent">No Results</div>)
          : <Dashboard
            usage={this.state.usage}
          />)
        }
        <Modal />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
