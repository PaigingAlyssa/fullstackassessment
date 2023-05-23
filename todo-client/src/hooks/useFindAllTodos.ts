import {useQuery} from "react-query";
import {fetchTodos} from "../api/todosApi";

export const useFindAllTodos = () => {
    const todosQuery = useQuery(['todos'], fetchTodos)
    return todosQuery;
}