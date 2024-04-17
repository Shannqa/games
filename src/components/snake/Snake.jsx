import { useState, useEffect, createContext } from "react";
import styles from "./Snake.module.css";
import SnakeBody from "./SnakeBody.jsx";
import Food from "./Food";

export const SnakeContext = createContext({
  snake: [],
  setSnake: () => {},
  direction: "",
  setDirection: () => {},
  food: [],
  setFood: () => {},
  speed: "",
  setSpeed: () => {},
  stage: "",
  setStage: () => {}
});

function Snake() {
  const [snake, setSnake] = useState([
    [50, 46], 
    [50, 48],
    [50, 50]
  ]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(() => getRandomFood());
  const [speed, setSpeed] = useState(1800);
  const [stage, setStage] = "playing";
  
  useEffect(() => {
    document.addEventListener("keydown", changeDirection);
    
    return () => document.removeEventListener("keydown", changeDirection);
  }, []);
  
  useEffect(() => {
    if (stage === "playing") {
      const moveInterval = setInterval(() => {
        moveSnake();
      }, speed);
    }
    return () => clearInterval(moveInterval);
  }, [snake, speed, direction]);

  
  function getRandomFood() {
    const row = Math.floor(Math.random() * 99);
    const column = Math.floor(Math.random() * 99);
    return [row, column];
  }
  
  function changeDirection(e) {
    switch (e.keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("up");
        break;
      case 39:
        setDirection("right");
        break;
      case 40:
        setDirection("down");
        break;
    }
  }
  
  function moveSnake() {
    const newSnake = [...snake];
    let head = newSnake[newSnake.length - 1];
    let newHead;

    switch (direction) {
      case "right":
        newHead = [head[0], head[1] + 2];
        break;
      case "up":
        newHead = [head[0] - 2, head[1]];
        break;
      case "left":
        newHead = [head[0], head[1] - 2];
        break;
      case "down":
        newHead = [head[0] + 2, head[1]];
    }
    newSnake.push(newHead);
    const isSnakeEating = isEating(newHead);
    const isSnakeCrashed = isCrashed(newHead);

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
    console.log(isSnakeEating);
    console.log(newSnake);
    console.log(direction);
    console.log(head);
    setSnake([...newSnake]);
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
          <Food />
        </div>
      </div>
    </SnakeContext.Provider>
  )
}

export default Snake