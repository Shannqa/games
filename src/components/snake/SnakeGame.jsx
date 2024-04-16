import { useState, useEffect, createContext } from "react";
import styles from "./Snake.module.css";
import SnakeBody from "./SnakeBody.jsx";

export const SnakeContext = createContext({
  snake: [],
  setSnake: () => {},
  direction: "",
  setDirection: () => {},
  food: [],
  setFood: () => {},
  speed: "",
  setSpeed: () => {}
});

function SnakeGame() {
  const [snake, setSnake] = useState([
    [50, 48],
    [50, 49],
    [50, 50]
  ]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(() => getRandomFood);
  const [speed, setSpeed] = useState(2000)
  
  useEffect(() => {
    document.addEventListener("keydown", changeDirection);
    
    return () => document.removeEventListener("keydown", changeDirection);
  }, []);
  
  useEffect(() => {
    const moveInterval = setInterval(() => {
      moveSnake();

    }, speed);

    return () => clearInterval(moveInterval);
  }, [speed]);

  
  function getRandomFood() {
    const row = Math.floor(Math.random() * 99);
    const column = Math.floor(Math.random() * 99);
    return [row, column];
  }
  
  function changeDirection(e) {
    switch (e.keyCode) {
      case 37:
        setDirection("left");
      case 38:
        setDirection("up");
      case 39:
        setDirection("right");
      case 40:
        setDirection("down");
    }
  }
  
  function moveSnake() {
    const newSnake = [...snake];
    const head = snake[snake.length - 1];
    
    switch (direction) {
      case "right":
        head = [head[0], head[1] + 1];
      case "up":
        head = [head[0] + 1, head[1]];
      case "left":
        head = [head[0], head[1] - 1];
      case "down":
        head = [head[0] - 1, head[1]];
    }
    newSnake.push(head);
    const isSnakeEating = isEating(head);
    const isSnakeCrashed = isCrashed(head);
    
    if (isSnakeCrashed) {
      return lostGame();
    }
    
    if (isSnakeEating === false) {
      // remove the tail
      newSnake.shift();
    } else {
      setSpeed(speed - 50);
      setFood(() => getRandomFood());
    }
    
  }
  
  function isEating(head) {
    if (head[0] === food[0] && head[1] === food[1]) {
      return true;
    }
    return false;
  }
  
  function isCrashed(head) {
    if (head[0] > 99 || head[0] < 0 || head[1] > 99 || head[1] < 0) {
      return true;
    }
    return false;
  }
  
  function lostGame() {
    
  }
  
  return(
    <SnakeContext.Provider value={{
      snake,
      setSnake,
      direction,
      setDirection,
      food,
      setFood,
      speed,
      setSpeed
    }}>
      <div className={styles.gameWindow}>
        <h2>Snake</h2>
        <div className={styles.board}>
          <SnakeBody />
        </div>
      </div>
    </SnakeContext.Provider>
  )
}

export default SnakeGame