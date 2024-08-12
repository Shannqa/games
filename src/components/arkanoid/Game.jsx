import React, { useState, createContext, memo } from "react";
import Canvas from "./Canvas";
import Modal from "./Modal";
import styles from "../../styles/arkanoid.module.css";
import { base, level1, level2, level3 } from "./levels";
import { settings } from "./settings.js";
import { paddles, drawPaddle, resetPaddle, movePaddle } from "./paddles.js";
import {
  balls,
  drawBall,
  moveBall,
  hitBallBrick,
  hitBallPaddle,
} from "./balls.js";
import { drawBricks, brick } from "./bricks.js";
import { livesScore } from "./score.js";
import { specialBricks, powerUpRelease, powerUp } from "./powerups.js";
import { restart, gameStage, changeGameStage } from "./stages.js";
export const ArkanoidContext = createContext({
  level: "",
  setLevel: () => {},
});

export let LEFT;
export let RIGHT;
function Game() {
  const [collision, setCollision] = useState(false);
  // stages: "ready", "playing", "loss", "lifeLoss" "win"

  const [level, setLevel] = useState(1);

  let bricks = level1(brick);

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
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    livesScore.draw(ctx);
    // bricks
    drawBricks(ctx, bricks);

    // ball
    drawBall(ctx, balls[0]);

    if (
      gameStage == "lifeLoss" ||
      gameStage == undefined ||
      gameStage == "ready"
    ) {
      // don't move the ball
    } else {
      balls[0].x += balls[0].vx;
      balls[0].y += balls[0].vy;
      moveBall();
    }

    // PADDLE
    drawPaddle(ctx, paddles[0]);
    movePaddle(ctx, paddles);

    hitBallPaddle();
    hitBallBrick(balls[0], bricks);
    hitBallBrick(balls[1], bricks);
    powerUpRelease(ctx);
  }
  return (
    <ArkanoidContext.Provider
      value={{
        level,
        setLevel,
      }}
    >
      <div className={styles.gameWindow}>
        <span>Press left or right arrow on your keyboard to start.</span>
        <Canvas
          draw={draw}
          collision={collision}
          setCollision={setCollision}
          width={settings.canvasW}
          height={settings.canvasH}
        />
        <Modal restart={restart} />
      </div>
    </ArkanoidContext.Provider>
  );
}

export default Game;
