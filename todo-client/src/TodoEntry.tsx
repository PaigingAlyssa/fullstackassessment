import React, { useEffect } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import {useMutation, useQueryClient} from "react-query";
import {createTodo} from "./TodosApi";
import {Todo} from "./Todo";


const TodoEntry = () => {
    const queryClient = useQueryClient();
    const createMutation = useMutation(createTodo, {
        onSuccess: (newTodo: Todo) => {
            queryClient.setQueriesData(['todos'], (oldTodos: Todo[] | undefined) => {
                return oldTodos ? [...oldTodos, newTodo] : [newTodo];
            })
        }
    })

    const [hasDescription, setHasDescription] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const save = () => {
        createMutation.mutate({description: description});
        setDescription('');
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            save();
        }
    };
    const handleClick = () => {
        save();
    }

    useEffect(() => {
        setHasDescription(description.length > 0);
    }, [description]);

    return(
        <div className="flex items-center h-16 w-full bg-white border-b-2">
            <ChevronDownIcon className="fill-slate-400 h-6 w-6 ml-4"/>
            <input
                className="h-full w-full px-4"
                type="text"
                placeholder="What needs to be done?"
                value={description}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className={`mx-4 px-4 rounded-full text-slate-400 ${hasDescription ? 'bg-rose-200' : ''}`}
                disabled={!hasDescription}
                onClick={handleClick}
            >
                Save
            </button>
        </div>
    )
}

export default TodoEntry;