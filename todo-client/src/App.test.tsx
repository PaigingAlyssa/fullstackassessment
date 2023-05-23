import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from './App';
import {QueryClient, QueryClientProvider} from "react-query";

describe('App', () => {
  const queryClient = new QueryClient();

  it('renders without crashing', () => {
    render(<QueryClientProvider client={queryClient}> <App/> </QueryClientProvider>);
    expect(screen.getByRole('heading', { name: 'todos'})).toBeInTheDocument();
  });

});
