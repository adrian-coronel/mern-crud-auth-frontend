import { useTasks } from "../context/TasksContext"
import {Link} from 'react-router-dom'

// Recibimos la tarea como un props
function TaskCard({ task }) {

  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          
          <Link className="bg-blue-600 py-1 px-4 rounded-md" to={`/tasks/${task._id}`}>
            edit
          </Link>

          <button className="bg-red-600 py-1 px-4 rounded-md" onClick={() => {
              deleteTask(task._id)
            }}
          >
            delete
          </button>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      {/* toLocaleDateString: Convierte una fecha en una cadena 
      utilizando la configuración regional actual o especificada. */}
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  )
}

export default TaskCard