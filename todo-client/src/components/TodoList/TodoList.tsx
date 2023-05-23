import React from "react";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoItem from "../TodoItem/TodoItem";
import {Todo} from "../../models/Todo/Todo";
import TodoFooter from "../TodoFooter/TodoFooter";
const TodoList = (props: {todos: Todo[]}) => {
    const {todos} = props;

    return (
        <div className="flex flex-col w-full border-4 rounded-md bg-white">
            <TodoHeader />
            {todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
            <TodoFooter todos={todos}/>
        </div>
    )
}

export default TodoList;