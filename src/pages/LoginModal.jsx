import React from "react";
import { useAuth } from "../components/context/AuthContext";

const LoginModal = ({ isOpen, setIsOpen }) => {
  const { handleChange, handleSubmitLogin, error } = useAuth();

  return (
    <div>
      <input type="checkbox" id="my-modal-login" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle z-[100000]">
        <div className="modal-box  bg-gray-900">
          <div className="modal-action">
            <label
              htmlFor="my-modal-login"
              className="text-secondary font-bold text-2xl hover:text-secondary-focus"
              onClick={() => setIsOpen(!isOpen)}
            >
              X
            </label>
          </div>
          <h3 className="font-bold text-lg text-gray-400">
            Introduce tus datos de usuario
          </h3>
          <form onSubmit={handleSubmitLogin} className="flex flex-col">
            {error && (
              <div className="alert alert-error my-2 w-[320px]">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            <label className="m-2 text-gray-400">Email:</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              className={
                error
                  ? "input input-bordered input-error w-full max-w-xs"
                  : "input input-bordered w-full max-w-xs text-gray-400"
              }
            />
            <label className="m-2 text-gray-400">Contraseña:</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Contraseña"
              className={
                error
                  ? "input input-bordered input-error w-full max-w-xs"
                  : "input input-bordered w-full max-w-xs text-gray-400"
              }
            />
            {/* ==> PARA QUE SE CIERRE EL MODAL NECESITAMOS EL LABEL */}
            <label
              htmlFor="my-modal-login"
              type="submit"
              className="btn btn-secondary my-8 w-full max-w-xs"
              onClick={handleSubmitLogin}
            >
              Entrar
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
