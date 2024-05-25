import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Home from './pages/home';
import NotFound from './pages/notfound';

const nonAuthenticatedLoader = async () => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {
    return redirect('/login');
  }
  return null;
};

const authenticatedLoader = async () => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    return redirect('/');
  }
  return null;
};

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <Home />,
      loader: nonAuthenticatedLoader,
    },
    {
      element: <Login />,
      path: 'login',
      loader: authenticatedLoader,
    },
    {
      element: <Register />,
      path: 'register',
      loader: authenticatedLoader,
    },
    {
      element: <NotFound />,
      path: '*',
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
