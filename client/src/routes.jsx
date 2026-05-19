import App from "./App";
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
  },
];

export default routes;