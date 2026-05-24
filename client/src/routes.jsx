import App from "./App";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";

// Initialize the array of routes
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
        {
            index: true,
            element: <Home />,
        },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;