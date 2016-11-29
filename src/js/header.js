import React from 'react';

const Header = ({ query, handleChange, isLoggedIn }) => (
  <div className="header">
    <div className="headerLeft">
      <img src="./favicon/android-chrome-192x192.png" alt="" />
      <a href="/?#">Déjà Vu</a>
    </div>
    <div className="searchBar" >
      {isLoggedIn === true && <form>
        <input
          className="inputField" type="text"
          placeholder="search"
          value={query}
          onChange={handleChange}
          onKeyUp={handleChange}
        />
      </form>}
    </div>
    <div className="headerRight">
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
