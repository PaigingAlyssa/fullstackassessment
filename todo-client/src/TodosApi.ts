import axios from './Http'
import {Todo} from "./Todo";

const fetchTodos = async () => {
    const { data } = await axios.get('/todos')
    return data
}

const createTodo = async (todo: Todo) => {
    const { data } = await axios.post('/todos', todo);
    return data
}

const updateTodo = async (todo: Todo) => {
    const { data } = await axios.put(`/todos/${todo.id}`, todo);
    return data
}

const deleteTodo = async (todo: Todo) => {
    await axios.delete(`/todos/${todo.id}`);
    return todo;
}
export {fetchTodos, createTodo, updateTodo, deleteTodo}
