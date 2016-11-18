import React from 'react';

class LandingPage extends React.Component {
  installExtension() {
    chrome.webstore.install();
  }

  render() {
    return (
      <div className="landingMain">
        <h1>Déjà Vu</h1>
        <h2>Find anything you have ever browsed</h2>
        <img className="webStore" onClick={this.installExtension.bind(this)} src="../img/chrome-web-store.png" alt="" />
      </div>
    );
  }
}

export default LandingPage;
