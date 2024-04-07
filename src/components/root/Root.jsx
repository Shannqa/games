import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import "./Root.css";

function Root() {
  return(
    <div className="root">
      <Header />
      <Menu />
      <Outlet />
    </div>
  )
}

export default Root