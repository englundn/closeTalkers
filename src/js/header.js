import React from 'react';

const Header = ({ query, handleChange, isLoggedIn }) => (
  <div className="header">
    <div className="headerLeft">
      <a><img src="./img/header-logo.png" alt="" /></a>
      <a>Déjà Vu</a>
    </div>
    <div className="searchBar" >
      {isLoggedIn && isLoggedIn !== 'loading' && <form className="searchForm">
        <input
          className="inputField" type="text"
          placeholder="search"
          value={query}
          onChange={handleChange}
          onKeyUp={handleChange}
        />
      </form>}
    </div>
    {!isLoggedIn && <div className="headerRight">
      <a href="/login">Sign in</a>
    </div>}
    {isLoggedIn && isLoggedIn !== 'loading' && <div className="headerRight">
      <a href="/logout"><img src={isLoggedIn} alt="" /></a>
    </div>}
  </div>
);

export default Header;
