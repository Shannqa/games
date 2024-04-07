/* not being used right now since i'm not dividing the website into multiple pages. might be useful later */

/* if needed, move that to router.jsx

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/game",
          element: <Game />
        }
        ]
    }
    ]);

    */




import React from "react";
import { Outlet, Link } from "react-router-dom"
import Game from "./Game"

function Root() {
  
  return(
    <div>
      <div className="links">
        <Link to="/">Home</Link>
      </div>
      <div>
        <p>bb</p>
        <Outlet />
      </div>
      <p>aa</p>
    </div>
    )
}

export default Root

{/* 




<div className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : "">
                        </div> */}