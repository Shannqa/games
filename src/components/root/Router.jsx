import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Battleships from "../battleships/Battleships";
import Snake from "../snake/Snake";
import Home from "./Home";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/battleships",
          element: <Battleships />
        },
        {
          path: "/snake",
          element: <Snake />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default Router