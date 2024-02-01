import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../ui/ErrorPage';
import Report from '../features/Report';
import WorkForm from '../features/WorkForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <WorkForm />,
      },
      {
        path: 'report',
        element: <Report />,
      },
    ],
  },
]);

export default router;
