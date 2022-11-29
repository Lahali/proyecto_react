import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const Signup = () => {
  const { handleChange, handleSubmit, error } = useAuth();

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center p-4 ">
      <form
        className="flex flex-col my-4 p-8 rounded-lg bg-gray-900"
        onSubmit={handleSubmit}
      >
        <h3 className="my-4 font-bold text-lg text-gray-400">
          Crea una cuenta nueva
        </h3>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        {error && (
          <div className="alert alert-error shadow-lg">
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
        <label className="m-2 mt-8 text-gray-400">Contraseña:</label>
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
        <button
          type="submit"
          className="btn btn-secondary my-8 w-full max-w-xs hover:btn-secondary-focus"
        >
          Registrarse
        </button>
      </form>
      <p className="text-gray-400">
        Si ya estás registrado,{" "}
        <Link to="/login" className="link link-secondary">
          {" "}
          inicia sesión{" "}
        </Link>
      </p>
    </div>
  );
};

export default Signup;
