import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Root from './Root';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />
}