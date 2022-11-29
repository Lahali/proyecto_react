import React from "react";

const Logout = () => {
  return (
    <div>
      <input type="checkbox" id="my-modal-logout" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-logout"
            className="font-bold text-lg absolute right-4 top-2 text-secondary hover:text-secondary-focus"
          >
            X
          </label>
          <h3 className="text-lg font-bold text-gray-400">
            Gracias por tu visita!
          </h3>
          <p className="py-4 text-gray-400">Has salido correctamente</p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
