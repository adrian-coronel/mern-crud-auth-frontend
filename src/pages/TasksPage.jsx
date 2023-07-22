import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"

function TasksPage() {

  const { getTasks, tasks } = useTasks();

  // Apenas cargue este componente, ejecutará getTasks()
  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length == 0) return (<h1>No tasks</h1>);

  return ( 
    <div>
      { // Recorremos las tareas con map
        tasks.map(task => (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default TasksPage