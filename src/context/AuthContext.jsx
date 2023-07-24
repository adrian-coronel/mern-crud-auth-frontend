// CONTEXT: Es una forma de crear un almacenamiento global o compartido que puede ser accesible por todos los componentes que están "suscritos" a ese contexto.

import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";


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
  const [loading, setLoading] = useState(true) // Utilizaremos determinar si la solicitud carga

  const signup = async (user) => {
    try {
      const res = await registerRequest(user); // ENVIAMOS LOS DATOS AL API
      console.log(res.data);
      setUser(res.data);
      setAuthenticated(true);
    } catch (error) {

      // Si el error viene en un array:
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data); // capturamos los errores enviados desde el backend
      }
      // Si no viene como array, extrae el mensaje en un array
      setErrors([error.response.data.message])
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data); 
    }
  }

  const logout = () => {
    // Removemos el token de las cookies
    Cookies.remove('token');

    setAuthenticated(false)
    setUser(null)
    
  }

  // MOSTRAR ERRORES 5 SEGUNDOS
  useEffect(() => {
    // Si hay almenos 1 error, espera 5 segundos antes de limpiar los errores
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      },5000);

      // Es IMPORTANTE limpiar el timer, ya que consume recursos
      return () => clearTimeout(timer);
    }
  },[errors]) // El efecto se dispara dependiendo de como cambié errors

  // Cuando se carge la pagina
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      // Si no se encontro el token
      if (!cookies.token) {
        setAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }

      // En caso exista el token
      try {
        // enviamos el token para que se verifique en el backend
        const res = await verifyTokenRequest(cookies.token)
        
        // Si no se recibe una respuesta
        if (!res.data) {
          setAuthenticated(false)
          setLoading(false)
          return;
        }

        // Si se recibe una respuesta(user)
        setAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        // Si axios recibío un error
        setAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    // EJECUTAMOS LA FUNCION ASINCRONA
    checkLogin()
  },[])  


  return (
    <AuthContext.Provider value={{
      // Todos los componentes hijos podrán llamar a signup y user
      signup,
      user,
      isAuthenticated,
      errors,
      signin,
      loading,
      logout,

    }}
    >
      {children}
    </AuthContext.Provider>
  )
};