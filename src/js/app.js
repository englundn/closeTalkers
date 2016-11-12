const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const URL = 'https://deja-vu.herokuapp.com/api/web';

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
    this.setState({ query: event.target.value });
  }

  query(event) {
    const qs = this.state.query;

    $.ajax({
      url: `${URL}/search?q="${qs}"`,
      method: 'GET',
      success: (data) => {
        this.setState({ results: data.hits.hits });
      },
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.query}>
          Search:
          <input type="text" value={this.state.query} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
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
