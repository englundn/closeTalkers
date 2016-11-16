import React from 'react';

const Header = ({ query, handleChange }) => (
  <div className="header">
    <div className="homeLink">
      <a href="/#">Déjà Vu</a>
    </div>
    <div className="searchBar" >
      <form>
        <input
          className="inputField" type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
    <div className="loginLink">
      <a href="/logout">Logout</a>
    </div>
  </div>
);

export default Header;
