const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

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
        <form onSubmit={this.query}>
          Search:
          <input type="text" value={this.state.query} onChange={this.handleChange} />
        </form>
        {this.state.results.map((result, i) => (
          <div key={i}>
            <h4>{result._source.title}</h4>
            <p>{result._source.text}</p>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
