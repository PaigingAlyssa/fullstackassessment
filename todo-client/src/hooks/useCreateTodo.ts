import {useMutation, useQueryClient} from "react-query";
import {createTodo} from "../api/todosApi";
import {Todo} from "../models/Todo/Todo";

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    const createMutation = useMutation(createTodo, {
        onSuccess: (newTodo: Todo) => {
            queryClient.setQueriesData(['todos'], (oldTodos: Todo[] | undefined) => {
                return oldTodos ? [...oldTodos, newTodo] : [newTodo];
            })
        }
    })
    return createMutation;
}