import React from 'react';

const Modal = ({ showDashboard }) => (
  <div id="myModal" className="modal">
    <div className="modal-content">
      <a onClick={showDashboard}><p>Dashboard</p></a>
      <a href="/logout"><p>Log out</p></a>
    </div>
  </div>
);

export default Modal;
