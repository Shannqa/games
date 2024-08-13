import React, { useState, createContext, memo } from "react";
import Canvas from "./Canvas";
import Modal from "./Modal";
import styles from "../../styles/arkanoid.module.css";
import { base, level1, level2, level3 } from "./levels";
import { settings } from "./settings.js";
import {
  paddles,
  drawPaddle,
  resetPaddle,
  movePaddle,
  defaultPaddle,
} from "./paddles.js";
import {
  balls,
  drawBall,
  moveBall,
  hitBallBrick,
  hitBallPaddle,
  defaultBall,
} from "./balls.js";
import { drawBricks, brick } from "./bricks.js";
import { livesScore } from "./score.js";
import { specialBricks, powerUpRelease, powerUp } from "./powerups.js";
import { restart, gameStage, changeGameStage, winLevel } from "./stages.js";

export let LEFT;
export let RIGHT;
export let LEVEL;
export let hitBricks = 0;
export let bricksInLevel;

export function changeHitBricks() {
  hitBricks += 1;
}

export function changeLevel() {
  LEVEL = 2;
}

function Game() {
  const [collision, setCollision] = useState(false);
  // stages: "ready", "playing", "loss", "lifeLoss" "win"
  const [scoreSave, setScoreSave] = useState(0);
  const [livesSave, setLivesSave] = useState(3);
  const [levelSave, setLevelSave] = useState(1);
  const [gameStageSave, setGameStageSave] = useState(null);
  // const [stateLives, setStateLives] = useState(3);
  LEVEL = 1;
  let bricks;

  if (levelSave == 1) {
    bricks = level1(brick);
    bricksInLevel = 11;
  } else if (levelSave == 2) {
    bricks = level2(brick);
  }

  document.onkeydown = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") {
      if (
        gameStage == "lifeLoss" ||
        gameStage == undefined ||
        gameStage == "ready"
      ) {
        changeGameStage("playing");
      }
      LEFT = true;
    }
    if (e.key === "Right" || e.key === "ArrowRight") {
      if (
        gameStage == "lifeLoss" ||
        gameStage == undefined ||
        gameStage == "ready"
      ) {
        changeGameStage("playing");
      }
      RIGHT = true;
    }
  };

  document.onkeyup = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
    if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
  };

  function draw(ctx, frameCount) {
    // if modal is visible - shouldnt be able to move the paddle
    // the ball doesnt move so thats good
    /*
bug
export function nextLevel() {
  console.log("next");
  changeGameStage("newLevel");
  LEVEL = 2;
  TypeError: Assignment to constant variable.
    at nextLevel (http://localhost:5173/src/components/arkanoid/stages.js?t=1723577010954:50:9)
    at onClick (http://localhost:5173/src/components/arkanoid/Modal.jsx?t=1723577010954:6:378)
    at HTMLUnknownElement.callCallback2 (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:3672:22)
    at Object.invokeGuardedCallbackDev (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:3697:24)
    at invokeGuardedCallback (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:3731:39)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:3734:33)
    at executeDispatch (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:7012:11)
    at processDispatchQueueItemsInOrder (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:7032:15)
    at processDispatchQueue (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:7041:13)
    at dispatchEventsForPlugins (http://localhost:5173/node_modules/.vite/deps/chunk-GGRJ7SSM.js?v=be96cc52:7049:11)




*/

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    livesScore.draw(ctx);
    drawBricks(ctx, bricks);
    drawPaddle(ctx, paddles[0]);
    drawBall(ctx, balls[0]);
    if (balls[1].active) {
      drawBall(ctx, balls[1]);
    }
    movePaddle(ctx, paddles);

    if (
      gameStage === "lifeLoss" ||
      gameStage === "ready" ||
      gameStage == "newLevel" ||
      gameStage == "modal"
    ) {
      // dont move the ball
    } else {
      if (balls[0].active) {
        balls[0].x += balls[0].vx;
        balls[0].y += balls[0].vy;
      }
      if (balls[1].active) {
        balls[1].x += balls[1].vx;
        balls[1].y += balls[1].vy;
      }
      moveBall();
    }

    hitBallPaddle();
    hitBallBrick(balls[0], bricks);
    // hitBallBrick(balls[1], bricks);
    powerUpRelease(ctx);
    console.log(gameStage);
    if (gameStage === "gameLoss") {
      setGameStageSave("gameLoss");
      console.log("1");
    } else if (gameStage === "modal") {
      // winLevel();
      changeGameStage("newLevel"); // omg it fucking works. reset the paddle though. and no modal visible
      hitBricks = 0;
      balls[0].x = defaultBall.x;
      balls[0].y = defaultBall.y;
      paddles[0].x = defaultPaddle.x;
      setGameStageSave("modd");
      setScoreSave(livesScore.score);
      setLevelSave(LEVEL + 1);
      setLivesSave(livesScore.lives);
      powerUp.kind = null;
      powerUp.released = false;
      powerUp.on = false;
    }
  }
  return (
    <div className={styles.gameWindow}>
      <span>Press left or right arrow on your keyboard to start.</span>
      <Canvas
        draw={draw}
        collision={collision}
        setCollision={setCollision}
        width={settings.canvasW}
        height={settings.canvasH}
        lives={livesScore.lives}
        score={livesScore.score}
        gameStage={gameStageSave}
      />
      <Modal
        restart={restart}
        lives={livesScore.lives}
        score={livesScore.score}
        gameStageSave={gameStageSave}
      />
    </div>
  );
}

export default Game;
