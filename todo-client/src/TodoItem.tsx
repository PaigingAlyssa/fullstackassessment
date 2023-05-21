import React from "react";
import {CheckCircleIcon} from '@heroicons/react/24/solid'
import {ExclamationCircleIcon} from '@heroicons/react/24/solid'
import {Todo, TodoStatus} from "./Todo";

const TodoItem = (props: {todo: Todo}) => {
    const [description, setDescription] = React.useState(props.todo.description);
    const [isEditing, setIsEditing] = React.useState(false);
    const {todo} = props;
    const doneClassNames = todo.status === TodoStatus.COMPLETE ? "line-through text-gray-400" : "";
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
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.currentTarget.value);
    }

    return(
        <div className="flex items-center h-16 w-full bg-white border-b-2">
            {todo.status === TodoStatus.COMPLETE && <CheckCircleIcon className="fill-rose-200 h-8 w-8 ml-4"/>}
            {todo.status === TodoStatus.INCOMPLETE && <ExclamationCircleIcon className="fill-gray-200 h-8 w-8 ml-4"/>}
            <input
                className={`h-full w-full px-4 ${doneClassNames}`}
                type="text"
                readOnly={!isEditing}
                value={description}
                onChange={handleDescriptionChange}
                onClick={handleInputClick}
                onMouseDown={handleMouseDown}
            />
        </div>
    )
}

export default TodoItem;