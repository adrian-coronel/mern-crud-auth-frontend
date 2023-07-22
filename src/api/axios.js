// En este apartado configuraremos a AXIOS

import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Este será el dominio base
  withCredentials: true, //  Axios permitirá enviar y recibir cookies y encabezados de autenticación
})

export default instance