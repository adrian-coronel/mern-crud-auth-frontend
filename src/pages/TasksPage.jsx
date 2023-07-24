import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard";

function TasksPage() {

  const { getTasks, tasks } = useTasks();

  // Apenas cargue este componente, ejecutará getTasks()
  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length == 0) return (<h1>No tasks</h1>);

  return ( 
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      { // Recorremos las tareas con map
        tasks.map(task => (
          // Utilizamos un componente para los tasks
          <TaskCard task={task} key={task._id} />
        ))
      }
    </div>
  )
}

export default TasksPage