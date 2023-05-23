import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {QueryClient, QueryClientProvider} from "react-query";
import TodoItem from "./TodoItem";
import {TodoStatus} from "../../models/Todo/Todo";
import { updateTodo, deleteTodo } from "../../api/todosApi";

// Mock the useUpdateTodo hook
jest.mock('../../api/todosApi', () => ({
    updateTodo: jest.fn(),
    deleteTodo: jest.fn()
}));
describe('TodoItem', () => {
    // Disable retries for all tests in this file
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    const completedTodo = {
        id: 1,
        description: "Test completedTodo",
        status: TodoStatus.COMPLETE
    };

    it('renders', () => {
        render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders a textbox with the description as a value', () => {
        render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
        expect(screen.getByRole('textbox')).toHaveValue(completedTodo.description);
    });

    it('renders a readonly textbox', () => {
        render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
        expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('renders an editable textbox on double click', async () => {
        const user = userEvent.setup();
        render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
        expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
        await user.dblClick(screen.getByRole('textbox'));
        expect(screen.getByRole('textbox')).not.toHaveAttribute('readonly');
    });

    it('updates the todo when the description is changed', async () => {
        const user = userEvent.setup();
        render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
        await user.dblClick(screen.getByRole('textbox'));
        await user.type(screen.getByRole('textbox'), "1");

        expect(updateTodo).toHaveBeenCalledWith({...completedTodo, description: completedTodo.description + "1"});
    });

    it('manages focus when editing', async () => {
        const user = userEvent.setup();
        render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
        await user.dblClick(screen.getByRole('textbox'));
        expect(screen.getByRole('textbox')).toHaveFocus();
        await user.type(screen.getByRole('textbox'), "{enter}");
        expect(screen.getByRole('textbox')).not.toHaveFocus();
    });

    it('deletes the todo when the delete button is clicked', async () => {
        const user = userEvent.setup();
        render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
        await user.click(screen.getByRole('button'));
        expect(deleteTodo).toHaveBeenCalledWith(completedTodo);
    });

    describe('when the todo is complete', () => {
        it('renders the text with strikethrough styling', () => {
            render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
            expect(screen.getByRole('textbox')).toHaveClass('line-through');
        });

        it('renders completed icon', () => {
            render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
            expect(screen.getByTestId('todo-complete-icon')).toBeInTheDocument();
        });

        it('toggles complete state on icon click', async () => {
            const user = userEvent.setup();
            render(<QueryClientProvider client={queryClient}> <TodoItem todo={completedTodo}/> </QueryClientProvider>);
            await user.click(screen.getByTestId('todo-complete-icon'));
            expect(updateTodo).toHaveBeenCalledWith({...completedTodo, status: TodoStatus.INCOMPLETE});
        });
    });

    describe('when the todo is incomplete', () => {
        const incompleteTodo = {
            id: 1,
            description: "Test completedTodo",
            status: TodoStatus.INCOMPLETE
        };

        it('renders the text with strikethrough styling', () => {
            render(<QueryClientProvider client={queryClient}> <TodoItem todo={incompleteTodo}/> </QueryClientProvider>);
            expect(screen.getByRole('textbox')).not.toHaveClass('line-through');
        });

        it('renders incomplete icon', () => {
            render(<QueryClientProvider client={queryClient}> <TodoItem todo={incompleteTodo}/> </QueryClientProvider>);
            expect(screen.getByTestId('todo-incomplete-icon')).toBeInTheDocument();
        });

        it('toggles complete state on icon click', async () => {
            const user = userEvent.setup();
            render(<QueryClientProvider client={queryClient}> <TodoItem todo={incompleteTodo}/> </QueryClientProvider>);
            await user.click(screen.getByTestId('todo-incomplete-icon'));
            expect(updateTodo).toHaveBeenCalledWith({...incompleteTodo, status: TodoStatus.COMPLETE});
        });
    });
});
