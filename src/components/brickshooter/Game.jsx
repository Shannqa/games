import React, { useState, createContext, memo, useEffect } from "react";
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
  level10,
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
import { gameStage, changeGameStage, winLevel } from "./stages.js";
import { addAmmo, ammo, drawGun, gun } from "./gun.js";
import LevelChooser from "./LevelChooser.jsx";
import { hitBallPaddle, hitBallBrick } from "./collisions.js";
import Controls from "./Controls.jsx";
import { keyDown, keyUp } from "./keyboard.js";
import { paused, drawPause, drawMobilePause, drawMobilePlay } from "./pause.js";
import { isTouchDevice } from "./touch.js";
export let LEVEL;
export let hitBricks = 0;
export let bricksInLevel;
export let sticky = false;

export function changeHitBricks(bricks) {
  hitBricks = bricks;
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
  const [gameState, setGameState] = useState("loaded");
  const [modal, setModal] = useState(true);
  const [savedBricks, setSavedBricks] = useState(null);

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
  } else if (levelSave == 10) {
    bricks = level10(brick);
  }
  bricksInLevel = countBricks(bricks);

  useEffect(() => {
    if (!modal) {
      document.addEventListener("keydown", keyDown);
      document.addEventListener("keyup", keyUp);
    } else {
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    }

    return () => {
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    };
  }, [modal]);

  // if (!modal) {

  // }

  function scroll() {
    const canvas = document.getElementById("brickCanvas");
    canvas.scrollIntoView();
  }

  function draw(ctx, frameCount) {
    if (paused) {
      drawPause(ctx);
      if (isTouchDevice()) {
        // drawMobilePlay(ctx);
        drawMobilePlay(ctx);
      }
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!paused) {
      if (isTouchDevice()) {
        // drawMobilePlay(ctx);
        drawMobilePause(ctx);
      }
    }
    livesScore.draw(ctx);
    if (savedBricks) {
      drawBricks(ctx, savedBricks);
    } else {
      drawBricks(ctx, bricks);
    }

    drawPaddle(ctx, paddles[0]);
    // console.log(paddles[0].x);
    balls.forEach((ball) => {
      if (ball.active) {
        drawBall(ctx, ball);
      }
    });
    // console.log(balls[0].x);
    if (modal || gameStage === "lifeLoss" || gameStage === "gameLoss") {
      return;
    }

    // powerups
    if (powerUp.on) {
      if (powerUp.kind == specialBricks.wormhole) {
        drawWormhole(ctx);
      } else if (powerUp.kind == specialBricks.extraLife) {
        announceExtraLife(ctx);
      } else if (powerUp.kind == specialBricks.gunMode) {
        ammo.forEach((bullet) => {
          if (bullet.active1 || bullet.active2) {
            drawGun(ctx, bullet);
            bullet.y += gun.vy;
          }
        });
        hitGunBricks(
          setModal,
          setGameState,
          setLevelSave,
          savedBricks,
          setSavedBricks,
          bricks
        );
      }
    }

    // move paddle
    movePaddle(ctx, paddles);

    // move ball
    if (balls[0].active && !balls[0].stay && !balls[0].waiting) {
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
    moveBall(
      setModal,
      setGameState,
      setLevelSave,
      savedBricks,
      setSavedBricks,
      bricks
    );

    hitBallPaddle();
    hitBallBrick(
      setModal,
      setGameState,
      setLevelSave,
      savedBricks,
      setSavedBricks,
      bricks
    );
    powerUpRelease(ctx);
  }
  return (
    <div className={styles.gameWindow}>
      {/* <MobileButtons /> */}
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
          gameState={gameState}
          modal={modal}
          setModal={setModal}
        />
        <Modal
          lives={livesScore.lives}
          score={livesScore.score}
          gameState={gameState}
          setGameState={setGameState}
          modal={modal}
          setModal={setModal}
          setLevelSave={setLevelSave}
          savedBricks={savedBricks}
          setSavedBricks={setSavedBricks}
          bricks={bricks}
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
