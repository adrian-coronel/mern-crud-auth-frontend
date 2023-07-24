import { useTasks } from "../context/TasksContext"
import {Link} from 'react-router-dom'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc) // Extendemos dayjs con el formato UTC, lo que nos dará una seríe de opciones

// Recibimos la tarea como un props
function TaskCard({ task }) {

  const { deleteTask } = useTasks();

  return (
    <div className="flex flex-col bg-zinc-800 max-w-md w-full p-8 rounded-md">
      <div className="flex-grow">

        <h1 className="text-2xl font-bold">{task.title}</h1>
          
        <p className="text-slate-300">{task.description}</p>

        {/* Utilizamos el formato UTC para mostrar nuestra fecha */}
        <p>
          {dayjs(task.date).utc().format('DD/MM/YYYY')}  
        </p>
      </div>

      <div className="flex gap-x-2 mt-4">
        <Link 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" 
          to={`/tasks/${task._id}`}
        >
          edit
        </Link>

        <button 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" 
          onClick={() => {
            deleteTask(task._id)
          }}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard