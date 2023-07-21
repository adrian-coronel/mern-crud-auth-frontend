import axios from "axios";

const API = 'http://localhost:3000/api';

// recibe un user, hace una consulta y pasa como segundo valor(req.body) al user
export const registerRequest = user =>  axios.post(`${API}/register`, user);

export const loginRequest = user => axios.post(`${API}/login`, user);