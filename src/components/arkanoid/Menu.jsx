import React, {useState} from "react";
import styles from "../../styles/arkanoid.module.css";
function Menu({lives}) {

// const [lives, setLives] = useState(4);


  return(<div className={styles.menu}>
    {/* <button onClick={(e) => setLives(lives - 1)}>bbb</button> */}
  <span>Lives: {lives}</span>
  <span>Score: </span>
</div>)
}

export default Menu