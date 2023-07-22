import axios from "./axios"; // importamos nuestra CONFIGURACIÓN DE AXIOS

/**
 * Como en la configuración definimos la baseUrl, 
 * no es necesario definir toda la ruta en el post('.../..')
 */

// recibe un user, hace una consulta y pasa como segundo valor(req.body) al user
export const registerRequest = user =>  axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify')