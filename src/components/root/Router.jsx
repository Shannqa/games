import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Battleships from "../battleships/Battleships";
import Minesweeper from "../minesweeper/Minesweeper";
import Brickshooter from "../brickshooter/Brickshooter";
import Home from "./Home";
import Highscores from "./Highscores";

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
          path: "/brickshooter",
          element: <Brickshooter />,
        },
        {
          path: "/highscores",
          element: <Highscores />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
