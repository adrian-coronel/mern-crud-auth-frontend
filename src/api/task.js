import axios from "./axios.js";

export const getTasksRequest = () => axios.get('/tasks')
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)
export const createTaskRequest = (task) => axios.post('/tasks', task)
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task) // recibe el id y el objeto actualizado
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)