import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import TodoList from "./TodoList";
import {Todo, TodoStatus} from "../../models/Todo/Todo";
import {QueryClient, QueryClientProvider} from "react-query";
describe('TodoList', () => {
    const todos = [
        {
            id: 1,
            description: "Test todo1 ",
            status: TodoStatus.COMPLETE
        },
        {
            id: 2,
            description: "Test todo2 ",
            status: TodoStatus.INCOMPLETE
        }
    ];

    // Disable retries for all tests in this file
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    it('renders all todos', () => {
        render(<QueryClientProvider client={queryClient}><TodoList todos={todos}/></QueryClientProvider>);
        expect(screen.getByDisplayValue("Test todo1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Test todo2")).toBeInTheDocument();
    });
});