import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TaskFormPage() {

  const { 
    register, // Devuelve tres propiedades (name,value,onchage)
    handleSubmit, 
    setValue, // Permite establecer un valor en a los registrados con register() HOOK FORM
  } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams(); // Permite obtener un objeto con los datos dinamicos que van en la URL

  useEffect(() => {
    async function loadTask() {
      // Si en la URL se encuentra un :ID
      if ( params.id ) {
        const task = await getTask(params.id)
        
        // Establecemos los valores en los inputs
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }

    loadTask();
  },[])

  const onSubmit = handleSubmit((data) => {
    if (  params.id ) 
      updateTask(params.id, data)
    else 
      createTask(data);

    navigate('/tasks')  
  })

  return ( 
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={ onSubmit }>
        <input 
          type="text" 
          placeholder="Title" 
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register('title')}
          //autoFocues: Apenas carga la pagina, el cursor estará posicionado en este input
          autoFocus
        />

        <textarea 
          rows="4" 
          placeholder="Description"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register('description')}
        ></textarea>

        <button type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default TaskFormPage