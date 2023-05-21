import React from "react";
import TodoEntry from "./TodoEntry";
import TodoItem from "./TodoItem";
import {Todo, TodoStatus} from "./Todo";
import TodoFooter from "./TodoFooter";
const TodoList = (props: {todos: Todo[]}) => {
    const {todos} = props;
    const todo = {
        description: "Learn React",
        status: TodoStatus.INCOMPLETE,
        id: 1
    }

    const todoDone = {
        description: "Learn React",
        status: TodoStatus.COMPLETE,
        id: 2
    }
    return (
        <div className="flex flex-col w-full border-4 rounded-md bg-white">
            <TodoEntry />
            {todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
            <TodoFooter todos={todos}/>
        </div>
    )
}

export default TodoList;