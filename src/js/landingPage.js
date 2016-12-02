import React from 'react';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.installExtension = this.installExtension.bind(this);
  }

  installExtension() {
    chrome.webstore.install();
  }

  render() {
    return (
      <div className="landingMain">
        <h1>Déjà Vu</h1>
        <h2>What your browser history could have been</h2>
        <img
          className="webStore"
          onClick={this.installExtension}
          src="../img/chrome-web-store.png" alt=""
        />
      </div>
    );
  }
}

export default LandingPage;
