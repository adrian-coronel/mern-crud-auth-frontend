import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";

function TaskFormPage() {

  const { register, handleSubmit } = useForm();
  const { createTask} = useTasks();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
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