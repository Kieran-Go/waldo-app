import App from "./App";
import ErrorPage from "./pages/Error/ErrorPage";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";

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
        {
          path: 'game/:id',
          element: <Game />,
        },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;