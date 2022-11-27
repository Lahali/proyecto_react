import React from "react";

const Logout = () => {
  return (
    <div>
      <input type="checkbox" id="my-modal-logout" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle z-[100000]">
        <div className="modal-box bg-gray-900">
          <div className="modal-action">
            <label
              htmlFor="my-modal-logout"
              className="text-secondary font-bold text-2xl hover:text-secondary-focus"
            >
              x
            </label>
          </div>
          <h3 className="font-bold text-lg text-gray-400 mb-6 text-center">Gracias por tu visita!</h3>
        </div>
      </div>
    </div>
  );
};

export default Logout;
