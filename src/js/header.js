import React from 'react';

const Header = ({ query, queryString, handleChange }) => (
  <div className="header">
    <div className="homeLink">
      <a href="/#">Déjà Vu</a>
    </div>
    <div className="searchBar" >
      <form onSubmit={query}>
        <input
          className="inputField" type="text"
          placeholder="Search"
          value={queryString}
          onChange={handleChange}
        />
      </form>
    </div>
    <div className="loginLink">
      <a href="/login">Log In</a>
    </div>
  </div>
);

export default Header;
