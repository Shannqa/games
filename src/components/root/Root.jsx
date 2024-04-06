import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./Root.css";

function Root() {
  return(
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Root