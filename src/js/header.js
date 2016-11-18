import React from 'react';

const Header = ({ query, handleChange, isLoggedIn }) => (
  <div className="header">
    <div className="homeLink">
      <a href="/?#">{/* Déjà Vu */}</a>
    </div>
    <div className="searchBar" >
      {isLoggedIn === true &&
        <form>
          <input
            className="inputField" type="text"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />
        </form>
      }
    </div>
    <div className="loginLogoutLink">
      {!isLoggedIn &&
        <a href="/login">Log In</a>
      }
      {isLoggedIn &&
        <a href="/logout">Log Out</a>
      }
    </div>
  </div>
);

export default Header;
