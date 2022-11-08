import React from "react";
import { useAuth } from "../components/context/AuthContext";

const Login = () => {
  const { handleChange, handleSubmitLogin, error } = useAuth();

  return (
    <div>
      <input type="checkbox" id="my-modal-login" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action">
            <label
              htmlFor="my-modal-login"
              className="btn btn-primary"
            >
              X
            </label>
          </div>
          <h3 className="font-bold text-lg">Introduce tus datos de usuario</h3>
          <form onSubmit={handleSubmitLogin} className="flex flex-col">
            {error && <p className="text-red-500">{error}</p>}
            <label className="m-2">Email:</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="m-2">Contraseña:</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Contraseña"
              className="input input-bordered w-full max-w-xs"
            />
            <button
              type="submit"
              className="btn btn-primary mt-3 w-full max-w-xs"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
