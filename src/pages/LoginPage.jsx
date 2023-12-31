import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {

  const {
    register,
    handleSubmit, 
    formState:{errors},
  } = useForm();
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()


  const onSubmit = handleSubmit((data) => {
    signin(data)
  })

  // REDIRECCIONAR SI EL USUARIO SE AUTHENTICO
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');

  },[isAuthenticated]) // se ejecutará si isAuthenticated cambia

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          loginErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
              {error}
            </div>
          ))
        }

        <h1 className="text-3xl font-bold mb-3">Login</h1>
        <form onSubmit={ onSubmit }>  

          {/* hook useForm puede hacer seguimiento de los valores, validaciones, etc */}
          <input 
            type="email" 
            {...register('email', {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          { // Si es que hay un error con email
            errors.email && (
              <p className="text-red-500">Email is requerired</p>
            )
          }

          <input 
            type="password" 
            {...register('password', {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          { // Si es que hay un error con password
            errors.password && (
              <p className="text-red-500">Password is requerired</p>
            )
          }

          <button 
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Link es una etiqueta de react-router-dom */}
        <p className="flex gap-x-2 justify-between">
          Don't have an account? 
          <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>

      </div>

    </div>
  )
}

export default LoginPage