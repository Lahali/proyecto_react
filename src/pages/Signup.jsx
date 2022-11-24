import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContext";

const Signup = ({isOpen, setIsOpen}) => {
  const { handleChange, handleSubmit, error } = useAuth();

  return (
    <div >
      <input type="checkbox" id="my-modal-signup" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-900">
          <div className="modal-action">
            <label
              htmlFor="my-modal-signup"
              className="text-secondary font-bold text-2xl hover:text-secondary-content"
              onClick={() => setIsOpen(!isOpen)}
            >
              X
            </label>
          </div>
          <h3 className="font-bold text-lg">Crea una cuenta nueva</h3>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <label className="m-2">Email:</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              className={
                error
                  ? "input input-bordered input-error w-full max-w-xs"
                  : "input input-bordered w-full max-w-xs"
              }
            />
            <label className="m-2">Contraseña:</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Contraseña"
              className={
                error
                  ? "input input-bordered input-error w-full max-w-xs"
                  : "input input-bordered w-full max-w-xs"
              }
            />
            <button
              type="submit"
              className="btn btn-secondary my-8 w-full max-w-xs"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
