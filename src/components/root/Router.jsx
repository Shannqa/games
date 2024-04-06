import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Battleships from "../battleships/Battleships"

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/battleships",
          element: <Battleships />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default Router