// sirve para proporcionar el enrutamiento y la navegación dentro de la aplicación
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"

function App() {
  return (
    // Define todas las rutas de la aplicaciones
    <BrowserRouter> 
      {/* Define que las rutas utilizando el componente Route */}
      <Routes>
        <Route path="/" element={<h1 className="text-4xl font-bold">Home Page</h1>} />
        {/* Pasamos la pagina LoginPage como elemento en la ruta /login */}
        <Route path="/login" element={ <LoginPage/> } />
        <Route path="/register" element={ <RegisterPage/> } />
        <Route path="/tasks" element={<h1 className="text-4xl font-bold">Tasks page</h1>} />
        <Route path="/add-task" element={<h1 className="text-4xl font-bold">new task</h1>} />
        <Route path="/tasks/:id" element={<h1 className="text-4xl font-bold">update task</h1>} />
        <Route path="/profile" element={<h1 className="text-4xl font-bold">profile</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App