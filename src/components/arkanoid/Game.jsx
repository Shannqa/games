import React, { useState, createContext, memo } from "react";
import Canvas from "./Canvas";
import Modal from "./Modal";
import styles from "../../styles/arkanoid.module.css";
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
} from "./levels";
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
  const [gameStageSave, setGameStageSave] = useState(null);
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
      if (sticky || stay) {
        SPACE = true;
        balls.forEach((ball) => {
          ball.stay = false;
        });
      }
    }
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
    if (e.key === " " || e.code === "Space") SPACE = false;
  };

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
        console.log("1", balls[1].x, balls[1].vx);
      }
      if (balls[2].active && !balls[2].stay) {
        balls[2].x += balls[2].vx;
        balls[2].y += balls[2].vy;
        console.log("2", balls[2].x, balls[2].vx);
      }
      moveBall();
    }

    hitBallPaddle();
    hitBallBrick(bricks);
    // hitBallBrick(balls[1], bricks);
    powerUpRelease(ctx);
    // console.log(gameStage);
    if (gameStage === "gameLoss") {
      setGameStageSave("gameLoss");
    } else if (gameStage === "gameWin") {
      changeGameStage("modalGameWin");
      setGameStageSave("modalNextLevel");
      setScoreSave(livesScore.score);
      setLevelSave(levelSave++);
      setLivesSave(livesScore.lives);
      powerUp.kind = null;
      powerUp.released = false;
      powerUp.on = false;
    } else if (gameStage === "levelWin") {
      changeGameStage("modalWin");
      balls[0].x = defaultBall.x;
      balls[0].y = defaultBall.y;
      paddles[0].x = defaultPaddle.x;
      setGameStageSave("modalNextLevel");
      setScoreSave(livesScore.score);
      setLevelSave(levelSave + 1);
      setLivesSave(livesScore.lives);
      hitBricks = 0;
      changeLevel(LEVEL + 1);
      powerUp.kind = null;
      powerUp.released = false;
      powerUp.on = false;
    }
  }
  return (
    <div className={styles.gameWindow}>
      <span>
        Press left or right arrow on your keyboard to move the paddle. For
        powerups: to launch a sticky ball, press space.
      </span>
      {/* <button onClick={() => console.log(LEVEL)}>lvl</button> */}
      <LevelChooser
        setLevelSave={setLevelSave}
        LEVEL={LEVEL}
        changeLevel={changeLevel}
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
  );
}

export default Game;
