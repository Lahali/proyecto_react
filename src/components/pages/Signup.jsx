import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Signup= () => {
 const [user, setUser] = useState({
  email: '',
  password: ''
 })
 const [error, setError] = useState('')

 const {signup} = useAuth()
//  hook para movernos por las rutas, de momento no lo usamos
 const navigate = useNavigate()

//  los valores del parámetro vienen del evento (es una destructuración del evento con los valores que queremos)
 const handleChange = ({target: {name, value}}) => {
  setUser({...user, [name]: value})
 }


const handleSubmit = (e) => {
  e.preventDefault()
  signup(user.email, user.password)
  console.log(user)
}

//  const handleSubmit = async (event) => {
//   event.preventDefault()
//   console.log("submit", user)
//   setError('')
//   try{
//     await signup(user.email. user.password)
//     console.log("super bien registrado")
//   } catch(error) {
//     console.log("algo va fatal",error.code)
//   }
//  }


  return (
 <div>
  {error && <p>{error}</p>}
<input type="checkbox" id="my-modal-6" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
      <div className="modal-action">
        <label htmlFor="my-modal-6" className="btn btn-primary">x</label>
      </div>
    <h3 className="font-bold text-lg">Crea una cuenta nueva</h3>
    <form className='flex flex-col' onSubmit={handleSubmit}>
     {/* <label className='m-2'>Nombre:</label> 
    <input onChange={handleChange} type="text" placeholder="Nombre" className="input input-bordered w-full max-w-xs" /> */}
    <label className='m-2'>Email:</label>
    <input onChange={handleChange} name='email' type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
    <label className='m-2'>Contraseña:</label>
    <input onChange={handleChange} name='password' type="password" placeholder="Contraseña" className="input input-bordered w-full max-w-xs" />
    <button type='submit' className='btn btn-primary mt-3 w-full max-w-xs'>Registrase</button>
    </form>
  </div>
</div>

 </div>  


)
}

export default Signup
