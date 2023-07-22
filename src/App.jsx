// sirve para proporcionar el enrutamiento y la navegación dentro de la aplicación
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import { AuthProvider } from "./context/AuthContext.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import TasksPage from "./pages/TasksPage.jsx"
import TaskFormPage from "./pages/TaskFormPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import HomePage from "./pages/HomePage.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"


function App() {
  return (
    // Las rutas dentro de AuthProvider, podrán acceder a sus valores globables
    <AuthProvider>
      {/* Define todas las rutas de la aplicaciones */}
      <BrowserRouter> 
        {/* Define que las rutas utilizando el componente Route */}
        <Routes>
          <Route path="/" element={ <HomePage/> } />
          {/* Pasamos la pagina LoginPage como elemento en la ruta /login */}
          <Route path="/login" element={ <LoginPage/> } />
          <Route path="/register" element={ <RegisterPage/> } />

          {/* ProtectedRoute: verificará si el usuario esta authentificado */}
          <Route element={ <ProtectedRoute/> }>
            <Route path="/tasks" element={ <TasksPage/> } />
            <Route path="/add-task" element={ <TaskFormPage/> } />
            <Route path="/tasks/:id" element={ <TaskFormPage/> } />
            <Route path="/profile" element={ <ProfilePage/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App