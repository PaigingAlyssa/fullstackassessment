import {useMutation, useQueryClient} from "react-query";
import {updateTodo} from "../api/todosApi";
import {Todo} from "../models/Todo/Todo";

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    const updateMutation = useMutation(updateTodo, {
        onSuccess: (updatedTodo: Todo) => {
            queryClient.setQueriesData(['todos'], (oldTodos: Todo[] | undefined) => {
                debugger;
                if(!oldTodos) return [updatedTodo];
                const index = oldTodos.findIndex(todo => todo.id === updatedTodo.id);
                oldTodos[index] = updatedTodo;
                return oldTodos;
            })
        }
    })
    return updateMutation;
}