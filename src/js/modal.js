import React from 'react';

const Modal = ({ showDashboard }) => (
  <div id="myModal" className="modal">
    <div className="modal-content">
      <span onClick={showDashboard}><p>Dashboard</p></span>
      <a href="/logout"><p>Log out</p></a>
    </div>
  </div>
);

export default Modal;
