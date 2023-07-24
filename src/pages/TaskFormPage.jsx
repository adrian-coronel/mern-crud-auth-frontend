import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc) // Extendemos dayjs con el formato UTC, lo que nos dará una seríe de opciones

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
        setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'))
      }
    }

    loadTask();
  },[])

  const onSubmit = handleSubmit((data) => {

    const dataValid = {
      ...data, // Copiamos lso datos
      date: data.date // antes de enviar, dará formato al 'date'
        ? dayjs.utc(data.date).format() // fecha seleccionada
        : dayjs.utc().format() // fecha default(actual)
    }
    
    if (  params.id ) 
      updateTask(params.id, dataValid)
    else 
      createTask(dataValid);

    navigate('/tasks')  
  })

  return ( 
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={ onSubmit }>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            placeholder="Title" 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register('title')}
            //autoFocues: Apenas carga la pagina, el cursor estará posicionado en este input
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <textarea 
            rows="4" 
            placeholder="Description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register('description')}
          ></textarea>

          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <button type="submit" className="bg-indigo-500 px-3 py-2 rounded-md mt-6">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage