import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth.js";

function RegisterPage() {

  // utilizamos register -> funcion de useForm() para registrar inputs
  const {register, handleSubmit} = useForm()  
}
  {/* handleSubmit: procesa los datos del formulario y realiza la lógica necesaria al enviar el formulario. */}
  const onSubmit = handleSubmit(async (values) => {
    const res = await registerRequest(values); // ENVIAMOS LOS DATOS AL API
    console.log(res) // Vemos la respuesta en la consola
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-m">
      <form onSubmit={ onSubmit }>
          
          {/* hook useForm puede hacer seguimiento de los valores, validaciones, etc */}
          <input 
            type="text" 
            {...register('username', {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />

          <input 
            type="email" 
            {...register('email', {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />

          <input 
            type="password" 
            {...register('password', {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />

          <button type="submit">
            Register
          </button>
      </form>
    </div>
  )
}

export default RegisterPage