import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import "../../../src/styles/App.css";

// import "./Root.css";
import Battleships from "../battleships/Battleships";

function Root() {
  return (
    <div className="root">
      <div className="top">
        <Header />
        {/* <Menu /> */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
