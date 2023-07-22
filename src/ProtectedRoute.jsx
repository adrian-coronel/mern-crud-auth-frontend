// Como este componente se encuentra dentro de AuthProvider en App.jsx tiene acceso a AuthContext.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"


function ProtectedRoute() {

  const { isAuthenticated, loading }  = useAuth();
  
  if (loading) return <h1>Loading...</h1>;

  // replace: reemplazará la ruta a /login si es que se intenta retroceder
  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

  // Si ya no se esta cargando y esta authenticado...
  return (
    <Outlet /> // Continua con el elemento de la ruta hija, si hay una.
  )
}

export default ProtectedRoute