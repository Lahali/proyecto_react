import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Signup= () => {
 const { handleChange, handleSubmit, error} = useAuth()


  return (
 <div>
<input type="checkbox" id="my-modal-signup" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
      <div className="modal-action">
        <label htmlFor="my-modal-signup" className="btn btn-primary">x</label>
      </div>
    <h3 className="font-bold text-lg">Crea una cuenta nueva</h3>
    <form className='flex flex-col' onSubmit={handleSubmit}>
    {error && <p className='text-red-500'>{error}</p>}
    <label className='m-2'>Email:</label>
    <input onChange={handleChange} name='email' type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
    <label className='m-2'>Contraseña:</label>
    <input onChange={handleChange} name='password' type="password" placeholder="Contraseña" className="input input-bordered w-full max-w-xs" />
    <button type='submit' className='btn btn-primary mt-3 w-full max-w-xs'>Registrarse</button>
    </form>
  </div>
</div>

 </div>  


)
}

export default Signup
