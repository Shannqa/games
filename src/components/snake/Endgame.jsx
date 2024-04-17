import { useContext } from "react";
import { SnakeContext } from "./Snake.jsx";

function Endgame() {
  const { gameOn, setGameOn, snake, setSnake } = useContext(SnakeContext);

  function playAgain() {
    // reset
    setGameOn(true)
    setSnake([
      [50, 46], 
      [50, 48],
      [50, 50]
    ]);
  }

  return(<div>
    <button onClick={playAgain}>play again</button>
    </div>)
}

export default Endgame