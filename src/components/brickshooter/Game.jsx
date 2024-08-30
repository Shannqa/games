import React, { useState, createContext, memo } from "react";
import Canvas from "./Canvas.jsx";
import Modal from "./Modal.jsx";
import styles from "../../styles/brickshooter.module.css";
import {
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
} from "./levels.js";
import { settings } from "./settings.js";
import {
  paddles,
  drawPaddle,
  resetPaddle,
  movePaddle,
  defaultPaddle,
} from "./paddles.js";
import { balls, drawBall, moveBall, defaultBall, resetBall } from "./balls.js";
import { drawBricks, countBricks, brick } from "./bricks.js";
import { livesScore } from "./score.js";
import {
  specialBricks,
  powerUpRelease,
  powerUp,
  hitGunBricks,
  drawWormhole,
  announceExtraLife,
} from "./powerups.js";
import { restart, gameStage, changeGameStage, winLevel } from "./stages.js";
import { addAmmo, ammo, drawGun, gun } from "./gun.js";
import LevelChooser from "./LevelChooser.jsx";
import { hitBallPaddle, hitBallBrick } from "./collisions.js";
import Controls from "./Controls.jsx";
export let LEFT;
export let RIGHT;
export let SPACE;
export let LEVEL;
export let hitBricks = 0;
export let bricksInLevel;
export let sticky = false;

export function changeHitBricks() {
  hitBricks += 1;
}

export function changeLevel(level) {
  LEVEL = level;
  console.log(LEVEL);
}

export function changeSticky(state) {
  sticky = state;
}

function Game() {
  const [collision, setCollision] = useState(false);
  // stages: "ready", "playing", "loss", "lifeLoss" "win"
  const [scoreSave, setScoreSave] = useState(0);
  const [livesSave, setLivesSave] = useState(3);
  const [levelSave, setLevelSave] = useState(1);
  const [gameStageSave, setGameStageSave] = useState("loaded");
  // const [stateLives, setStateLives] = useState(3);
  LEVEL = levelSave;
  let bricks;

  if (levelSave == 1) {
    bricks = level1(brick);
  } else if (levelSave == 2) {
    bricks = level2(brick);
  } else if (levelSave == 3) {
    bricks = level3(brick);
  } else if (levelSave == 4) {
    bricks = level4(brick);
  } else if (levelSave == 5) {
    bricks = level5(brick);
  } else if (levelSave == 6) {
    bricks = level6(brick);
  } else if (levelSave == 7) {
    bricks = level7(brick);
  } else if (levelSave == 8) {
    bricks = level8(brick);
  } else if (levelSave == 9) {
    bricks = level9(brick);
  }
  bricksInLevel = countBricks(bricks);

  document.onkeydown = function (e) {
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      SPACE = true;
      balls.forEach((ball) => {
        if (ball.stay) {
          ball.stay = false;
        }
      });
    }
 
    if (e.key === "Left" || e.key === "ArrowLeft") {
      e.preventDefault();
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
      e.preventDefault();
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
    if (e.key === " " || e.code === "Space") SPACE = false;
  };

  function scroll() {
    const canvas = document.getElementById("brickCanvas");
    canvas.scrollIntoView();
  }

  function draw(ctx, frameCount) {
    if (gameStageSave == "newLevel") {
      setGameStageSave("playing");
      changeGameStage("ready");
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    livesScore.draw(ctx);

    drawBricks(ctx, bricks);
    drawPaddle(ctx, paddles[0]);

    if (powerUp.on) {
      if (powerUp.kind == specialBricks.wormhole) {
        drawWormhole(ctx);
      } else if (powerUp.kind == specialBricks.extraLife)
        announceExtraLife(ctx);
    }

    balls.forEach((ball) => {
      if (ball.active) {
        drawBall(ctx, ball);
      }
    });

    movePaddle(ctx, paddles);
    if (powerUp.kind == specialBricks.gunMode && powerUp.on) {
      // gunMode powerup
      // console.log(ammo);
      ammo.forEach((bullet) => {
        if (bullet.active1 || bullet.active2) {
          drawGun(ctx, bullet);
          bullet.y += gun.vy;
        }
      });
      hitGunBricks(bricks);
      // console.log(ammo);
    }
    if (
      gameStage === "lifeLoss" ||
      gameStage === "ready" ||
      gameStage == "newLevel" ||
      gameStage == "modalWin"
    ) {
      // dont move the ball
    } else {
      if (balls[0].active && !balls[0].stay) {
        balls[0].x += balls[0].vx;
        balls[0].y += balls[0].vy;
      }
      if (balls[1].active && !balls[1].stay) {
        balls[1].x += balls[1].vx;
        balls[1].y += balls[1].vy;
      }
      if (balls[2].active && !balls[2].stay) {
        balls[2].x += balls[2].vx;
        balls[2].y += balls[2].vy;
      }
      moveBall();
    }

    hitBallPaddle();
    hitBallBrick(bricks);
    powerUpRelease(ctx);
    // console.log(gameStage);
    if (gameStage === "gameLoss") {
      setGameStageSave("gameLoss");
    } else if (gameStage === "gameWin") {
      changeGameStage("modalGameWin");
      setGameStageSave("modalNextLevel");
      setScoreSave(livesScore.score);
      setLevelSave(levelSave + 1);
      setLivesSave(livesScore.lives);
      powerUp.kind = null;
      powerUp.released = false;
      powerUp.on = false;
    } else if (gameStage === "levelWin") {
      changeGameStage("modalWin");
      setGameStageSave("modalNextLevel");
      setScoreSave(livesScore.score);
      setLevelSave(levelSave + 1);
      setLivesSave(livesScore.lives);
      hitBricks = 0;
      changeLevel(LEVEL + 1);
    }
  }
  return (
    <div className={styles.gameWindow}>
      {/* <button onClick={() => console.log(LEVEL)}>lvl</button> */}
      <div className={styles.gameCanvas}>
        <img
          id="scroller"
          className={styles.scroller}
          src="/keyboard_double_arrow_down_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
          onClick={scroll}
          alt="Scroll into view"
        />
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
      <Controls
        setLevelSave={setLevelSave}
        levelSave={levelSave}
        changeLevel={changeLevel}
      />
    </div>
  );
}

export default Game;