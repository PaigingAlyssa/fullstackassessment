import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Header from "./Header";
import TodoList from "./TodoList";
import {TodoStatus} from "./Todo";
import {fetchTodos} from "./TodosApi";
function App() {
    const { data, error, isError, isLoading } = useQuery(['todos'], fetchTodos)

    return (
        <div className="h-full min-h-screen w-full min-w-screen bg-slate-100">
            <div className="container mx-auto py-8">
                <div className="flex flex-col items-center">
                    <Header title="todos" />
                    <div className="flex w-1/2">
                        {isError && <div>Error: {JSON.stringify(error)}</div>}
                        {isLoading && <div>Loading...</div>}
                        {data && <TodoList todos={data}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
