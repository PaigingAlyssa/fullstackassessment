import React from 'react';
import TodoEntry from "./TodoEntry";
import Header from "./Header";
import TodoList from "./TodoList";
import {TodoStatus} from "./Todo";
function App() {
    const todoIncomplete = {
        description: "Learn React",
        status: TodoStatus.INCOMPLETE,
        id: 1
    }

    const todoComplete = {
        description: "Learn React",
        status: TodoStatus.COMPLETE,
        id: 2
    }

    const todos = [todoIncomplete, todoComplete];

    return (
      <div className="h-screen w-screen bg-slate-100">
          <div className="container mx-auto py-8">
              <div className="flex flex-col items-center">
                  <Header title="todos" />
                  <div className="flex w-1/2">
                      <TodoList todos={todos}/>
                  </div>
              </div>
          </div>
      </div>
);
}

export default App;
