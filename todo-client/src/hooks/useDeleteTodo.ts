import {useMutation, useQueryClient} from "react-query";
import {deleteTodo} from "../api/todosApi";
import {Todo} from "../models/Todo/Todo";

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: (deletedTodo: Todo) => {
            queryClient.setQueriesData(['todos'], (oldTodos: Todo[] | undefined) => {
                return oldTodos ? oldTodos.filter(todo => todo.id !== deletedTodo.id) : [];
            })
        }
    })
    return deleteMutation;
}