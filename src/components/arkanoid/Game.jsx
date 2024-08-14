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
  LEVEL += 1;
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
  /* state stages:
  loaded - game first opened
  modalGameOver
  modalNextLevel
  startLevel
  */
  /* canvas stages:
  ready
  playing
  gameLoss
  lifeLoss
  levelWin
  modalWin
  modalLoss
  */

  if (levelSave == 1) {
    bricks = level1(brick);
    bricksInLevel = 11;
  } else if (levelSave == 2) {
    bricks = level2(brick);
    bricksInLevel = 46;
  } else if (levelSave == 3) {
    bricks = level3(brick);
    bricksInLevel = 46;
  }

  document.onkeydown = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") {
      if (
        gameStage == "lifeLoss" ||
        gameStage == undefined ||
        gameStage == "ready"
      ) {
        changeGameStage("playing");
      } else if (
        gameStage == "gameLoss" ||
        gameStage == "modalWin" ||
        gameStage == "levelWin" ||
        gameStage == "modalLoss"
      ) {
        return;
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
      } else if (
        gameStage == "gameLoss" ||
        gameStage == "modalWin" ||
        gameStage == "levelWin" ||
        gameStage == "modalLoss"
      ) {
        return;
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

    bug gameStage == newLevel
    paddle moves, ball doesnt
*/
    if (gameStageSave == "newLevel") {
      setGameStageSave("playing");
      changeGameStage("ready");
    }
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
      gameStage == "modalWin"
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
    } else if (gameStage === "levelWin") {
      // winLevel();
      changeGameStage("modalWin");
      balls[0].x = defaultBall.x;
      balls[0].y = defaultBall.y;
      paddles[0].x = defaultPaddle.x;
      setGameStageSave("modalNextLevel");
      setScoreSave(livesScore.score);
      setLevelSave(levelSave + 1);
      setLivesSave(livesScore.lives);
      hitBricks = 0;
      changeLevel();
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
        setGameStageSave={setGameStageSave}
      />
    </div>
  );
}

export default Game;
