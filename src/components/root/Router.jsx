import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Battleships from "../battleships/Battleships";
import Minesweeper from "../minesweeper/Minesweeper";
import Arkanoid from "../arkanoid/Arkanoid";
import Home from "./Home";
function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/battleships",
          element: <Battleships />,
        },
        {
          path: "/minesweeper",
          element: <Minesweeper />,
        },
        {
          path: "/arkanoid",
          element: <Arkanoid />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
