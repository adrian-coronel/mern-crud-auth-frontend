// CONTEXT: Es una forma de crear un almacenamiento global o compartido que puede ser accesible por todos los componentes que están "suscritos" a ese contexto.

import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth.js";


export const AuthContext = createContext();


// Esta funcion nos permite no estar importando el useContext y authContext solo importamos useAuth() y será suficiente
// También verifica si el la ruta es hija de este contexto, para que pueda usar sus valores globales 
export const useAuth = () => {
  const context = useContext(AuthContext); // Lee nuestro contexto y nos retorna el actual

  // Si el contexto no existe
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}


// Este provider es un componente que va a englobar a otros
export const AuthProvider = ({children}) => {
  
  // Usuario que va a poder ser leído de forma global en la app
  const [user, setUser] = useState(null) //Devuelve un valor con estado y una función para actualizarlo.
  const [isAuthenticated, setAuthenticated] = useState(false); // Permitirá saber si un usuario ya esta authenticado
  const[errors, setErrors] = useState([]); // Utilizaremos para capturar los errores

  const signup = async (user) => {
    try {
      const res = await registerRequest(user); // ENVIAMOS LOS DATOS AL API
      console.log(res.data);
      setUser(res.data);
      setAuthenticated(true);
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data); // capturamos los errores enviados desde el backend
    }
  }

  return (
    <AuthContext.Provider value={{
      // Todos los componentes hijos podrán llamar a signup y user
      signup,
      user,
      isAuthenticated,
      errors,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
};