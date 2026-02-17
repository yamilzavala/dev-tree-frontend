import Error from './components/Error';
import ErrorElement from './components/ErrorElement';
import AppLayout from './layouts/AppLayout';
import LinkTreeView from './views/LinkTreeView';
import LoginView from './views/LoginView'
import ProfileView from './views/ProfileView';
import RegisterView from './views/RegisterView'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginView />,
        errorElement: <Error />,
    },
    {
        path: '/auth/login',
        element: <LoginView />,
        errorElement: <Error />,
    },
    {
        path: '/auth/register',
        element: <RegisterView />,
        errorElement: <Error />,
    },
    {
        path: '/admin',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <LinkTreeView />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'profile',
                element: <ProfileView />,
                errorElement: <ErrorElement />,
            }
        ]
    },

])

const WrapperRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default WrapperRouter;