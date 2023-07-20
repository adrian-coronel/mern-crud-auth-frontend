// sirve para proporcionar el enrutamiento y la navegación dentro de la aplicación
import { BrowserRouter, Routes, Route } from "react-router-dom" 

function App() {
  return (
    // Define todas las rutas de la aplicaciones
    <BrowserRouter> 
      {/* Define que las rutas utilizando el componente Route */}
      <Routes>
        <Route path="/" element={<h1 className="text-4xl font-bold">Home Page</h1>} />
        <Route path="/login" element={<h1 className="text-4xl font-bold">Login</h1>} />
        <Route path="/register" element={<h1 className="text-4xl font-bold">Register</h1>} />
        <Route path="/tasks" element={<h1 className="text-4xl font-bold">Tasks page</h1>} />
        <Route path="/add-task" element={<h1 className="text-4xl font-bold">new task</h1>} />
        <Route path="/tasks/:id" element={<h1 className="text-4xl font-bold">update task</h1>} />
        <Route path="/profile" element={<h1 className="text-4xl font-bold">profile</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App