import React from "react";
import {Todo} from "../../models/Todo/Todo";

const TodoFooter = (props: {todos: Todo[]}) => {
    const {todos} = props;
    const completedTodoCount = todos.filter((todo) => todo.status === "COMPLETE").length;
    const incompleteTodoCount = todos.filter((todo) => todo.status === "INCOMPLETE").length;
    return(
        <div className="flex flex-col md:flex-row items-center justify-between w-full bg-white border-b-2 p-4">
            <p className="text-gray-400">
                {todos.length} total
            </p>
            <p className="text-gray-400 invisible md:visible">
                |
            </p>
            <p className="text-gray-400">
                {completedTodoCount} completed
            </p>
            <p className="text-gray-400 invisible md:visible">
                |
            </p>
            <p className="text-gray-400">
                {incompleteTodoCount} incomplete
            </p>
        </div>
    )
}

export default TodoFooter;