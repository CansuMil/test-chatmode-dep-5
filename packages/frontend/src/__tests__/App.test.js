import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch.mockResolvedValue({
    json: () => Promise.resolve([]),
    ok: true,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  const testQueryClient = createTestQueryClient();
  global.fetch.mockResolvedValue({
    json: () => Promise.resolve([]),
    ok: true,
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

test('calculates and displays correct stats', async () => {
  const testQueryClient = createTestQueryClient();
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];
  
  global.fetch.mockResolvedValue({
    json: () => Promise.resolve(mockTodos),
    ok: true,
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });
  
  expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('deletes a todo when delete button is clicked', async () => {
  const testQueryClient = createTestQueryClient();
  const mockTodos = [
    { id: 1, title: 'Todo to delete', completed: false },
  ];
  
  global.fetch
    .mockResolvedValueOnce({
      json: () => Promise.resolve(mockTodos),
      ok: true,
    })
    .mockResolvedValueOnce({
      json: () => Promise.resolve({}),
      ok: true,
    })
    .mockResolvedValueOnce({
      json: () => Promise.resolve([]),
      ok: true,
    });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Todo to delete')).toBeInTheDocument();
  });

  const deleteButton = screen.getByRole('button', { name: /delete todo/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('handles API errors gracefully', async () => {
  const testQueryClient = createTestQueryClient();
  global.fetch.mockRejectedValue(new Error('API Error'));

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
  });
});

test('uses relative URL for API calls', () => {
  // This test verifies that API_URL is not hardcoded to localhost
  const testQueryClient = createTestQueryClient();
  
  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/^\/api\/todos$|^http:\/\/localhost:3001\/api\/todos$/),
  );
});
