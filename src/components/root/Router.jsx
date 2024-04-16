import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Battleships from "../battleships/Battleships";
import Snake from "../snake/Snake"

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
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