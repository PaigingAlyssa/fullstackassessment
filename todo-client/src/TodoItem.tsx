import React from "react";
import {CheckCircleIcon} from '@heroicons/react/24/solid'
import {ExclamationCircleIcon} from '@heroicons/react/24/solid'
import {Todo, TodoStatus} from "./Todo";
import {useMutation, useQueryClient} from "react-query";
import {deleteTodo, updateTodo} from "./TodosApi";

const TodoItem = (props: {todo: Todo}) => {
    const {todo} = props;
    const [isEditing, setIsEditing] = React.useState(false);
    const doneClassNames = todo.status === TodoStatus.COMPLETE ? "line-through text-gray-400" : "";
    const queryClient = useQueryClient();

    const updateMutation = useMutation(updateTodo, {
        onSuccess: (updatedTodo: Todo) => {
            queryClient.setQueriesData(['todos'], (oldTodos: Todo[] | undefined) => {
                if(!oldTodos) return [updatedTodo];
                const index = oldTodos.findIndex(todo => todo.id === updatedTodo.id);
                oldTodos[index] = updatedTodo;
                return oldTodos;
            })
        }
    })

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: (deletedTodo: Todo) => {
            queryClient.setQueriesData(['todos'], (oldTodos: Todo[] | undefined) => {
                return oldTodos ? oldTodos.filter(todo => todo.id !== deletedTodo.id) : [];
            })
        }
    })
    const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
        if(!isEditing){
            event.preventDefault();
        }
    }
    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if(event.detail !== 2) {
            event.preventDefault();
            return;
        }
        setIsEditing(true);
        event.currentTarget.focus();
    }

    //It would be a good idea to debounce this since every character input is going to trigger a network call
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const description = event.currentTarget.value;
        updateMutation.mutate({
            ...todo,
            description
        })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.currentTarget.blur();
            setIsEditing(false);
        }
    };

    const handleToggleComplete = () => {
        updateMutation.mutate({
            ...todo,
            status: todo.status === TodoStatus.COMPLETE ? TodoStatus.INCOMPLETE : TodoStatus.COMPLETE
        });
    }

    const handleDelete = () => {
        deleteMutation.mutate(todo);
    }

    return(
        <div className="flex items-center h-16 w-full bg-white border-b-2 group">
            {todo.status === TodoStatus.COMPLETE &&
                <CheckCircleIcon onClick={handleToggleComplete} className="fill-rose-200 h-12 w-12 ml-4"/>}
            {todo.status === TodoStatus.INCOMPLETE &&
                <ExclamationCircleIcon onClick={handleToggleComplete} className="fill-gray-200 h-12 w-12 ml-4"/>}
            <input
                className={`h-full w-full px-4 ${doneClassNames}`}
                type="text"
                readOnly={!isEditing}
                value={todo.description}
                onChange={handleDescriptionChange}
                onClick={handleInputClick}
                onMouseDown={handleMouseDown}
                onKeyDown={handleKeyDown}
            />
            <button
                className="invisible group-hover:visible mx-4 px-4 rounded-full text-slate-400 bg-rose-500"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}

export default TodoItem;