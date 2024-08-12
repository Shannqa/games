import React, { useState, createContext, memo } from "react";
import Canvas from "./Canvas";
import Modal from "./Modal";
import styles from "../../styles/arkanoid.module.css";
import { base, level1, level2, level3 } from "./levels";
import { settings } from "./settings.js";
import { paddles, drawPaddle, resetPaddle } from "./paddles.js"
import { balls, drawBall, moveBall } from "./balls.js";

export const ArkanoidContext = createContext({
  level: "",
  setLevel: () => {},
});

function Game({setter}) {
  const [collision, setCollision] = useState(false);
  // stages: "ready", "playing", "loss", "lifeLoss" "win"
  
  const [level, setLevel] = useState(1);

  let gameStage = "ready";
  let LEFT;
  let RIGHT;
  
  
  let bricks = level1(brick);

  function start() {
    setGameStage("playing");
  }

  function restart() {
    setGameStage("ready");
    setLives(settings.lives);
  }

  function lifeLoss() {
    gameStage = "lifeLoss";
    console.log(gameStage);
    resetBall(balls[0]);
    resetPaddle(paddles[0]);
    
    if (powerUp.on) {
      powerUp.kind.stop();
    }
    powerUp.kind = null;
    powerUp.on = false;
    powerUp.released = false;
    
    livesScore.lives -= 1;
  }

  function gameLoss() {
    setGameStage("gameLoss");
  }

  function win() {
    setGameStage("win");
  }

  document.onkeydown = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") {
      if (gameStage == "lifeLoss") {
        gameStage = "playing"
      }
      LEFT = true;
    } 
    if (e.key === "Right" || e.key === "ArrowRight")  {
      if (gameStage == "lifeLoss") {
        gameStage = "playing"
      }
      RIGHT = true;
    } 
  };

  document.onkeyup = function (e) {
    if (e.key === "Left" || e.key === "ArrowLeft") LEFT = false;
    if (e.key === "Right" || e.key === "ArrowRight") RIGHT = false;
  };

  function paddleBall() {
    // bounce: ball - paddle
    const balls = [ball1, ball2];
    const paddles = [paddle1, paddle2];
    balls.forEach((ball) => {
      if (
        ball.y + ball.radius >= paddle1.y &&
        ball.y + ball.radius <= paddle1.y + paddle1.h &&
        // ball.y < paddle.y &&
        ball.x + ball.radius >= paddle1.x &&
        ball.x - ball.radius <= paddle1.x + paddle1.w
      ) {
        ball.vy = -ball.vy;
      }

      // WORMHOLE, bounce ball vs paddle2
      if (
        ball.y + ball.radius >= paddle2.y &&
        ball.y < paddle2.y &&
        ball.x + ball.radius >= paddle2.x &&
        ball.x - ball.radius <= paddle2.x + paddle2.w
      ) {
        ball.vy = -ball.vy;
      }
    });
    // problem, at the left corner the ball doesnt bounce
  }

  function ballBricks(ball) {
    // collision - ball - brick
    for (let c = 0; c < 11; c++) {
      for (let r = 0; r < 11; r++) {
        const br = bricks[c][r];
        if (
          br.painted === "solid" &&
          ball.x + ball.radius >= br.x &&
          ball.x - ball.radius <= br.x + brick.w &&
          ball.y + ball.radius >= br.y &&
          ball.y - ball.radius <= br.y + brick.h
        ) {
          // solid brick, reflect ball
          ball.vy = -ball.vy;
        } else if (
          br.painted === true &&
          ball.x + ball.radius >= br.x &&
          ball.x - ball.radius <= br.x + brick.w &&
          ball.y + ball.radius >= br.y &&
          ball.y - ball.radius <= br.y + brick.h
        ) {
          livesScore.score += 10;
          let newBricks = [...bricks];
          console.log(newBricks);
          newBricks[c][r].painted = false;
          console.log(newBricks[c][r]);

          // special bricks
          const isSpecialBrick =
            !powerUpReleased &&
            Math.floor(Math.random() * 100) < settings.specialBricksPercent;
          if (isSpecialBrick) {
            console.log("sp");
            powerUpReleased = true;

            const keys = Object.keys(specialBricks);
            const random = Math.floor(Math.random() * 3);
            powerUpKind = specialBricks[keys[random]];

            console.log(powerUpKind);

            powerUp.x = br.x;
            powerUp.y = br.y;
          }
          ball.vy = -ball.vy;
        }
      }
    }
  }

  
  function draw(ctx, frameCount) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    livesScore.draw(ctx);
    // bricks
    drawBricks(ctx);

    // ball
    balls[0].draw(ctx);

    if (gameStage == "lifeLoss") {
      // ball1.x = ball1.x;
      // ball1.y = ball1.y;
    } else {
      ball1.x += ball1.vx;
      ball1.y += ball1.vy;
      moveBall();
    }

    // PADDLE
    drawPaddle(ctx, paddle[0]);
    paddleMoves(ctx);
    paddleBall();

    powerUpRelease(ctx);
    ballBricks(ball1);
    ballBricks(ball2);
  }
  return (
    <ArkanoidContext.Provider
      value={{
        level,
        setLevel,
      }}
    >
      <div className={styles.gameWindow}>
        {/* <Menu lives={lives} score={score}/> */}
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
