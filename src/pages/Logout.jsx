import React from "react";

const Logout = () => {
  return (
    <div>
      <input type="checkbox" id="my-modal-logout" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action">
            <label htmlFor="my-modal-logout" className="btn btn-primary">
              x
            </label>
          </div>
          <h3 className="font-bold text-lg">Gracias por tu visita!</h3>
        </div>
      </div>
    </div>
  );
};

export default Logout;
