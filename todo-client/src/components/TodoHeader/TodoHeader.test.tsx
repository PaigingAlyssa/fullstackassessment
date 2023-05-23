import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {QueryClient, QueryClientProvider} from "react-query";
import TodoHeader from "./TodoHeader";
import {createTodo, updateTodo} from "../../api/todosApi";

// Mock the useUpdateTodo hook
jest.mock('../../api/todosApi', () => ({
    createTodo: jest.fn()
}));
describe('TodoHeader', () => {
    // Disable retries for all tests in this file
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    it('renders', () => {
        render(<QueryClientProvider client={queryClient}><TodoHeader/></QueryClientProvider>);
        expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
    });

    it('saves the todo when the save button is clicked', async () => {
        const user = userEvent.setup();
        render(<QueryClientProvider client={queryClient}> <TodoHeader /> </QueryClientProvider>);
        await user.type(screen.getByRole('textbox'), "My new todo");
        await user.click(screen.getByRole('button', {name: 'Save'}));

        expect(createTodo).toHaveBeenCalledWith({description: "My new todo"});
    });

    it('saves the todo when the enter button is pressed', async () => {
        const user = userEvent.setup();
        render(<QueryClientProvider client={queryClient}> <TodoHeader /> </QueryClientProvider>);
        await user.type(screen.getByRole('textbox'), "My new todo");
        await user.type(screen.getByRole('textbox'), "{enter}");

        expect(createTodo).toHaveBeenCalledWith({description: "My new todo"});
    });
});