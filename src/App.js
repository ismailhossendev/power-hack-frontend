import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { route } from './Routes/route';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route}>
      </RouterProvider>
    </QueryClientProvider>
  )
}

export default App;
