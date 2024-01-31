import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../ui/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

export default router;
