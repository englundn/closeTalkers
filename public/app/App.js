// import React from 'react';
// import ReactDOM from 'react-dom';

const esURL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200/test/test/AVhQ8_qA6vD3_5aG54Q7';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.query = this.query.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  query(event) {
    const qs = this.state.query;
    console.log(qs);
    $.ajax({
      url: esURL,
      method: 'GET',
      dataType: 'jsonp',
      auth: {
        user: 'user1',
        pass: 'user11',
      },
      success: (data) => {
        console.log(data);
      },
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.query}>
        Search:
        <input type="text" value={this.state.query} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
