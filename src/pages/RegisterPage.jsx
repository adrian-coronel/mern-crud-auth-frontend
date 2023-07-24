import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {

  // utilizamos register -> funcion de useForm() para registrar inputs
  const { register, handleSubmit, formState: {errors}, } = useForm()  
  const { signup, isAuthenticated, errors: registerErrors } = useAuth(); // usamos una función global de este contexto
  const navigate = useNavigate(); // Nos permitirá navegar entre las diferentes rutas
  
  // REDIRECCIONAR A '/tasks'
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  },[isAuthenticated]); // Si isAuthenticated sufre un cambio, se redireccionará

  {/* handleSubmit: procesa los datos del formulario y realiza la lógica necesaria al enviar el formulario. */}
  const onSubmit = handleSubmit(async (data) => {
    signup(data); // pasamos los valores del usuario
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))
        }

        <h1 className="text-3xl font-bold mb-3">Register</h1>
        <form onSubmit={ onSubmit }>
            
            {/* hook useForm puede hacer seguimiento de los valores, validaciones, etc */}
            <input 
              type="text" 
              {...register('username', {required: true})}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Username"
            />
            { // Si es que hay un error con username
              errors.username && (
                <p className="text-red-500">Username is requerired</p>
              )
            }

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
              Register
            </button>
        </form>

        {/* Link es una etiqueta de react-router-dom */}
        <p className="flex gap-x-2 justify-between">
          Already have an account? 
          <Link to="/login" className="text-sky-500">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage