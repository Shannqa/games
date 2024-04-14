import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import "./Root.css";
import Battleships from "../battleships/Battleships";

function Root() {
  return(
    <div className="root">
      <Header />
      {/* <Menu /> */}
      {/* <Outlet /> */}
      <Battleships />
    </div>
  )
}

export default Root