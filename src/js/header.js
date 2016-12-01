import React from 'react';

const Header = ({ query, handleChange, isLoggedIn, toggleModal }) => (
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
          // onKeyUp={handleChange}
        />
      </form>}
    </div>
    {!isLoggedIn && <div className="headerRight">
      <a href="/login">Sign in</a>
    </div>}
    {isLoggedIn && isLoggedIn !== 'loading' && <div className="headerRight">
      <a className="profilePic">
        <img src={isLoggedIn} alt="" onClick={toggleModal} />
        <span id="t1" className="triangle1" />
        <span id="t2" className="triangle2" />
      </a>
    </div>}
  </div>
);

export default Header;
