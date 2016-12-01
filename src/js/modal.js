import React from 'react';

const Modal = ({ showDashboard }) => (
  <div id="myModal" className="modal">
    <div className="modal-content">
      <p onClick={showDashboard}>Dashboard</p>
      <a href="/logout"><p>Log out</p></a>
    </div>
  </div>
);

export default Modal;
