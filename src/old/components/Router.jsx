import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Game from "./Game.jsx";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Game />,
      errorElement: <ErrorPage />,
    }
    ]);
  return <RouterProvider router={router} />
}

export default Router;