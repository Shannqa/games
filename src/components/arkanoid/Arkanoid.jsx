import React, {useState} from "react";
import Game from "./Game";
import Menu from "./Menu";
function Arkanoid() {
  const [lives, setLives] = useState(3);
  function setter() {
    setLives(2);
  }
  return <div>
    <Game setter={setter} />
    {/* <Menu lives={lives}/> */}
    </div>;
}

export default Arkanoid;
